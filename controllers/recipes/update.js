const statusCode = require('http-status-codes').StatusCodes;
const Recipe = require('../../services/recipes');
const ErrorMessages = require('../../utils/errorMessages');
const isUserAuthorized = require('../../middlewares/recipe/isUserAuthorized');
const isUserAdmin = require('../../middlewares/recipe/isUserAdmin');

const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(statusCode.UNAUTHORIZED).json({ message: ErrorMessages.emptyToken });
    }

    if (typeof isUserAuthorized(token) !== 'object') {
      return res.status(statusCode.UNAUTHORIZED).json({ message: isUserAuthorized(token) });
    }

    if (!isUserAdmin(token)) return res.status(statusCode.UNAUTHORIZED).end();

    const { userId } = await Recipe.getRecipeById(id);
    
    const recipe = { id, name, ingredients, preparation, userId };
    
    await Recipe.updateRecipe(recipe);

    res.status(statusCode.OK).json({ _id: id, ...recipe });
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.put('/:id', updateRecipe);
};