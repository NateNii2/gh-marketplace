const router = require("express").Router();

const {
  protect,
  admin,
} = require("../middleware/auth.middleware");

const {
  getDashboardStats,
} = require("../controllers/adminDashboard.controller");

router.get("/", protect, admin, getDashboardStats);

module.exports = router;