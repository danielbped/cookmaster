const express = require('express');
const recipeController = require('./index');

const router = express.Router({ mergeParams: true });

recipeController.createRecipe(router);
recipeController.getAllRecipes(router);
recipeController.getRecipeById(router);
recipeController.updateRecipe(router);
recipeController.deleteRecipe(router);
recipeController.updateImageRecipe(router);

module.exports = (root) => {
  root.use('/recipes', router);
};