const statusCode = require('http-status-codes').StatusCodes;
const Recipe = require('../../services/recipes');
const ErrorMessages = require('../../utils/errorMessages');
const isUserAuthorized = require('../../middlewares/recipe/isUserAuthorized');

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(statusCode.UNAUTHORIZED).json({ message: ErrorMessages.emptyToken });
    }

    if (typeof isUserAuthorized(token) !== 'object') {
      return res.status(statusCode.UNAUTHORIZED).json({ message: isUserAuthorized(token) });
    }

    await Recipe.deleteRecipe(id);

    res.status(statusCode.NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.delete('/:id', deleteRecipe);
};