const router = require("express").Router();

const authController = require("../controllers/auth.controller");

const userController = require("../controllers/user.controller");
const requireAuth = require("../middleware/requireAuth");

router.post("/register", authController.signUp);

router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
router.get("/:id", userController.userInfo);
router.get("/:id/userfood", requireAuth, userController.userFood);
router.get("/gettorecipe/:id", userController.getFoodToRecipe);

router.put("/:id/updateallergy", userController.updateUserAllergy);
router.put("/:id/updatediet", userController.updateUserDiet);

router.put("/addfood/:id", userController.addFoodToFridge);
router.put("/removefood/:id", userController.removeFoodFromFridge);
router.put("/deletefood/:id", userController.deleteFoodFromFridge);

router.put("/editfridgeexpiration/:id", userController.editUserFoodExpiration);
router.put("/editfridgequantity/:id", userController.editUserFoodQuantity);
router.put("/editshoppingquantity/:id", userController.editShoppingQuantity);
router.put("/editshoppingbio/:id", userController.editShoppingBio);

router.put("/addtorecipe/:id", userController.addFoodToRecipe);

router.put("/addtoshoppinglist/:id", userController.addFoodToShoppingList);
router.put("/removeshoppinglist/:id", userController.removeShoppingList);
router.put("/deleteshoppingitem/:id", userController.deleteShoppingItem);
router.put("/deleterecipefood/:id", userController.deleteRecipeFoodFilter);

router.put("/addfavrecipe/:id", userController.addFavoriteRecipe);
router.put("/removefavrecipe/:id", userController.removeFavoriteRecipe);

router.put("/additems/:id", userController.addShoppingToFridge);

module.exports = router;
