const RecipeModel = require("../models/recipe.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readRecipe = async (req, res) => {
  const recipe = await RecipeModel.find();
  res.status(200).json(recipe);
};

module.exports.selectRecipe = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown: " + req.params.id);

  try {
    RecipeModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          selectRecipe: req.body.selectedBoolean,
        },
      },
      { new: true, upsert: true },
      (err, data) => {
        if (!err) res.status(201).json(data);
        else return res.status(400).json(err);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
