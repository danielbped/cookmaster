const Recipe = require('../../models/recipes');

const createRecipe = async (recipe) => Recipe.createRecipe(recipe);

module.exports = createRecipe;