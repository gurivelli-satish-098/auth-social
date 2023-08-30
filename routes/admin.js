const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/admin");
const adminController = new AdminController();

router.post("/create", adminController.createAdmin);
router.post("/login", (req, res)=> res.send(true));

module.exports = router;
