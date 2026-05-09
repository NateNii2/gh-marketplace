const router = require("express").Router();
const { protect, admin } = require("../middleware/auth.middleware");
const ctrl = require("../controllers/adminDashboard.controller");

router.get("/", protect, admin, ctrl.getDashboardStats);

module.exports = router;
