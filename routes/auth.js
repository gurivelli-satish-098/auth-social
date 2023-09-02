const express = require("express");
const AuthController = require("../controllers/auth");
const router = express.Router();

const authController = new AuthController();

router.post("/password/create", authController.createPassword);

module.exports = router;
