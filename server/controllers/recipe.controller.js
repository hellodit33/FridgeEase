//controller requirements
const RecipeModel = require("../models/recipe.model");

module.exports.readRecipe = async (req, res) => {
  const recipe = await RecipeModel.find();
  res.status(200).json(recipe);
};
