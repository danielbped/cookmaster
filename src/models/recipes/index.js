const createRecipe = require('./create');
const getAllRecipes = require('./getAll');
const getRecipeById = require('./getById');
const updateRecipe = require('./update');
const deleteRecipe = require('./delete');
const updateImageRecipe = require('./updateImage');

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  updateImageRecipe,
};