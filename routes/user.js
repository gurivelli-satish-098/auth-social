const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const AuthController = require("../controllers/auth");
const userController = new UserController();
const authController = new AuthController();

router.post("/sign-up", userController.signUp);
router.post("/login/password", userController.userLogin);
router.post("/logout", authController.logoutUser);

module.exports = router;
