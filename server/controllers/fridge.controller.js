//controller requirements
const FridgeModel = require("../models/fridge.model");

module.exports.readFood = async (req, res) => {
  const foodFromFridge = await FridgeModel.find();
  res.status(200).json(foodFromFridge);
};
