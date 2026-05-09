const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth.middleware");
const admin = require("../middleware/admin.middleware");
const {
  getAllProducts,
} = require("../controllers/admin.controller");

router.get("/", protect, admin, getAllProducts);

module.exports = router;
