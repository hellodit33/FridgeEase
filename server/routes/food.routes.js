const router = require("express").Router();
const foodController = require("../controllers/food.controller");

router.get("/", foodController.readFood);

module.exports = router;
