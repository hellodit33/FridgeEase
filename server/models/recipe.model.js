const mongoose = require("mongoose");

var RecipeSchema = new mongoose.Schema({
  title: { type: String },

  ingredients: {
    type: [
      {
        quantity: String,
        name: String,
      },
    ],
  },

  climateImpact: { type: String },

  category: { type: String },

  difficulty: { type: String },

  price: { type: Number },

  duration: { type: Number },

  people: { type: Number },

  description: { type: String },

  image: { type: String },

  selectRecipe: { type: Boolean },
});

module.exports = mongoose.model("recipes", RecipeSchema);
