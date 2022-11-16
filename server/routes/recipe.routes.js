const router = require("express").Router();
const recipeController = require("../controllers/recipe.controller");

router.get("/", recipeController.readRecipe);
router.put("/selectrecipe/:id", recipeController.selectRecipe);

module.exports = router;
