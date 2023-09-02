const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/admin");
const adminController = new AdminController();

router.post("/create", adminController.createAdmin);
router.post("/approve", adminController.aprroveAdmin);
router.post("/login", adminController.masterLogin);

module.exports = router;
