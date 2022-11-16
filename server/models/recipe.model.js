const mongoose = require("mongoose");

var RecipeSchema = new mongoose.Schema({
  title: { type: String },

  ingredients: [String],

  carbon: { type: Number },

  category: { type: String },

  difficulty: { type: String },

  price: { type: Number },

  duration: { type: Number },

  people: { type: Number },

  description: { type: String },

  picture: { type: String },
});

module.exports = mongoose.model("recipes", RecipeSchema);
