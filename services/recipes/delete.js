const Recipe = require('../../models/recipes');

const deleteRecipe = async (id) => Recipe.deleteRecipe(id);

module.exports = deleteRecipe;