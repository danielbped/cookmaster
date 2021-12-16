const statusCode = require('http-status-codes').StatusCodes;
const Recipe = require('../../services/recipes');

const getAllRecipes = async (_req, res, next) => {
  try {
    const recipes = await Recipe.getAllRecipes();

    res.status(statusCode.OK).json(recipes);
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.get('/', getAllRecipes);
};