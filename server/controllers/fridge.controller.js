//controller requirements
const FridgeModel = require("../models/fridge.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readFood = async (req, res) => {
  const fridge = await FridgeModel.find();
  res.status(200).json(fridge);
};
