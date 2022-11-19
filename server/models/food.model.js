const mongoose = require("mongoose");

var FoodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  carbon: { type: String, required: true },
  category: { type: String, required: true },
  expiration: { type: Number, required: true },
  quantity: { type: Number },
  logo: { type: String },
});

module.exports = mongoose.model("food", FoodSchema);
