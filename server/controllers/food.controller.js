//controller requirements
const FoodModel = require("../models/food.model");

module.exports.readFood = async (req, res) => {
  const food = await FoodModel.find();
  res.status(200).json(food);
};
