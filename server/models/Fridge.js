const mongoose = require("mongoose");

var FridgeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  carbon: { type: Number, required: true },
  category: { type: String, required: true },
  expiration: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("Fridge", FridgeSchema);
