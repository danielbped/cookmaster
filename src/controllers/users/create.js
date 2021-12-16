const statusCode = require('http-status-codes').StatusCodes;
const User = require('../../services/users');
const isUserValid = require('../../middlewares/user/isValid');
const userAlreadyExists = require('../../middlewares/user/alreadyExists');
const ErrorMessages = require('../../utils/errorMessages');

const createUser = async (req, res, next) => {
  try {
    const user = { ...req.body, role: 'user' };

    if (!await isUserValid(user)) {
      return res.status(statusCode.BAD_REQUEST)
        .json({ message: ErrorMessages.invalidEntries });
    }

    if (await userAlreadyExists(user)) {
      return res.status(statusCode.CONFLICT)
        .json({ message: ErrorMessages.emailAlreadyRegistered });
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
  router.post('/', createUser);
};