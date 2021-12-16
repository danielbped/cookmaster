const Recipe = require('../../models/recipes');

const updateRecipe = async (recipe) => Recipe.updateRecipe(recipe);

module.exports = updateRecipe;