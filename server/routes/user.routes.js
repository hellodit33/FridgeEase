const router = require("express").Router();

const authController = require("../controllers/auth.controller");

const userController = require("../controllers/user.controller");

router.post("/register", authController.signUp);

router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
//get users and user info from db
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.get("/:id/userfood", userController.userFood);

//update user info
router.put("/:id", userController.updateUser);
//add and remove food from fridge
router.put("/addfood/:id", userController.addFoodToFridge);
router.put("/removefood/:id", userController.removeFoodFromFridge);
router.patch("/editfood/:id", userController.editFoodFromFridge);
router.patch("/deletefood/:id", userController.deleteFoodFromFridge);
router.put("/addtorecipe/:id", userController.addFoodToRecipe);
router.get("/gettorecipe/:id", userController.getFoodToRecipe);

module.exports = router;
