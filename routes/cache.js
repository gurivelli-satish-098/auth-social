const express = require("express");
const router = express.Router();
const { clearCache } = require("../controllers/cache");

router.delete("/purge-cache", clearCache);

module.exports = router;