const statusCode = require('http-status-codes').StatusCodes;
const Recipe = require('../../services/recipes');
const ErrorMessages = require('../../utils/errorMessages');
const isUserNotAuthorized = require('../../middlewares/recipe/isUserAuthorized');
const processImage = require('../../middlewares/recipe/processImage');

const updateImageRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;

    if (!token) {
      return res.status(statusCode.UNAUTHORIZED).json({ message: ErrorMessages.emptyToken });
    }

    if (typeof isUserNotAuthorized(token) !== 'object') {
      return res.status(statusCode.UNAUTHORIZED).json({ message: isUserNotAuthorized(token) });
    }

    const recipe = await Recipe.getRecipeById(id);

    const image = `localhost:3000/src/uploads/${id}.jpeg`;

    await Recipe.updateImageRecipe({ ...recipe, image });
  
    res.status(statusCode.OK).json({ _id: id, ...recipe, image });
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.put('/:id/image', processImage.single('image'), updateImageRecipe);
};