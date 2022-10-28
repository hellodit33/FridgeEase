const router = require("express").Router();

const authController = require("../controllers/auth.controller");

const userController = require("../controllers/user.controller");

router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);
//get users and user info from db
router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
//update user info
router.put("/:id", userController.updateUser);

//follow and unfollow other users
router.patch("/addfood/:id", userController.addFoodToFridge);
router.patch("/removefood/:id", userController.removeFoodFromFridge);

module.exports = router;
