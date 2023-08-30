const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");
const userController = new UserController();

// router.get("/", async (req, res) => {
//   await userService.fetchUser(req.query.userName, req.query.countryId);
//   res.send("satish");
// });

router.post("/sign-up", userController.signUp);

module.exports = router;
