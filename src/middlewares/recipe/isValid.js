const isIngredientsValid = (ingredients) => {
  if (!ingredients) return false;

  return true;
};

const isNameValid = (name) => {
  if (!name) return false;

  return true;
};

const isPreparationValid = (preparation) => {
  if (!preparation) return false;

  return true;
};

const isRecipeValid = ({ name, ingredients, preparation }) => isIngredientsValid(ingredients)
  && isNameValid(name)
  && isPreparationValid(preparation);

module.exports = (recipe) => isRecipeValid(recipe);