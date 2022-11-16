const router = require("express").Router();
const recipeController = require("../controllers/recipe.controller");

router.get("/", recipeController.readRecipe);

module.exports = router;
