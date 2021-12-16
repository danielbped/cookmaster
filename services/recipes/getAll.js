const Recipe = require('../../models/recipes');

const getAllRecipes = async () => Recipe.getAllRecipes();

module.exports = getAllRecipes;