const Recipes = require('../../models/recipes');

const updateImageRecipe = async (image) => Recipes.updateImageRecipe(image);

module.exports = updateImageRecipe;