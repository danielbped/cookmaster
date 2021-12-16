const statusCode = require('http-status-codes').StatusCodes;
const errorMessages = require('../utils/errorMessages');
const isLoginValid = require('../middlewares/login/isValid');
const isUserAuthorized = require('../middlewares/login/isAuthorized');
const tokenGenerator = require('../middlewares/login/tokenGenerator');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!await isLoginValid(email, password)) {
      return res.status(statusCode.UNAUTHORIZED)
        .json({ message: errorMessages.emptyFieldLogin });
    }

    if (!await isUserAuthorized(email, password)) {
      return res.status(statusCode.UNAUTHORIZED)
        .json({ message: errorMessages.wrongCredentials });
    }

    const token = await tokenGenerator(email, password);

    res.status(statusCode.OK).json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = (root) => {
  root.use('/login', login);
};