const statusCode = require('http-status-codes').StatusCodes;
const Recipe = require('../../services/recipes');
const ErrorMessages = require('../../utils/errorMessages');
const isRecipeValid = require('../../middlewares/recipe/isValid');
const isUserAuthorized = require('../../middlewares/recipe/isUserAuthorized');
const findUserByEmail = require('../../services/users/findByEmail');

const createRecipe = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const { name, ingredients, preparation } = req.body;
    
    if (typeof isUserAuthorized(token) !== 'object') {
      return res.status(statusCode.UNAUTHORIZED).json({ message: isUserAuthorized(token) });
    }
    
    const { data } = isUserAuthorized(token);
    
    const { _id: userId } = await findUserByEmail(data.email);

    const recipe = { name, ingredients, preparation, userId };

    if (!isRecipeValid(recipe) || !isUserAuthorized(token)) {
      return res.status(statusCode.BAD_REQUEST).json({ message: ErrorMessages.invalidEntries });
    }

    const newRecipe = await Recipe.createRecipe(recipe);

    res.status(statusCode.CREATED)
      .json({ recipe: { _id: newRecipe.insertedId, ...recipe } });
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.post('/', createRecipe);
};