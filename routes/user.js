const express = require("express");
const router = express.Router();
const UserService = require("../services/user");
const userService = new UserService();

router.get("/", async (req, res) => {
  await userService.fetchUser(req.query.userName, req.query.countryId);
  res.send("satish");
});

module.exports = router;
