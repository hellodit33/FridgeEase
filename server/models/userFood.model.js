const mongoose = require("mongoose");

//Create schema and model for posts
var UserFoodSchema = new mongoose.Schema({
  userfood: [String],
});

module.exports = mongoose.model("userFood", UserFoodSchema);
