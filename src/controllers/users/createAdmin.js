const statusCode = require('http-status-codes').StatusCodes;
const User = require('../../services/users');
const ErrorMessages = require('../../utils/errorMessages');
const isUserAdmin = require('../../middlewares/recipe/isUserAdmin');

const createAdmin = async (req, res, next) => {
  try {
    const user = { ...req.body, role: 'admin' };
    const token = req.headers.authorization;

    if (isUserAdmin(token) === 'false') {
      return res.status(statusCode.FORBIDDEN).json({ message: ErrorMessages.notAdmin });
    }

    const newUser = await User.createUser(user);
    
    const { password, ...userWithoutPassword } = user;

    res.status(statusCode.CREATED).json({
      user: { _id: newUser.insertedId, ...userWithoutPassword },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.post('/admin', createAdmin);
};