const statusCode = require('http-status-codes').StatusCodes;
const Recipe = require('../../services/recipes');
const ErrorMessages = require('../../utils/errorMessages');
const isValidId = require('../../middlewares/recipe/isValidId');

const getRecipeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(statusCode.NOT_FOUND)
        .json({ message: ErrorMessages.recipeNotFound });
    }

    const recipe = await Recipe.getRecipeById(id);

    if (!recipe) {
      return res.status(statusCode.NOT_FOUND)
        .json({ message: ErrorMessages.recipeNotFound });
    }

    res.status(statusCode.OK).json(recipe);
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.get('/:id', getRecipeById);
};