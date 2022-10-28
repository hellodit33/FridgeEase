const router = require("express").Router();
const userFoodController = require("../controllers/userFood.controller");

router.patch("/", userFoodController.addFoodToUserFridge);

module.exports = router;
