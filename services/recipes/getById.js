const Recipe = require('../../models/recipes');

const getRecipeById = async (id) => Recipe.getRecipeById(id);

module.exports = getRecipeById;