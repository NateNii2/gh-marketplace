const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  verifyPhone,
  changePassword,
deleteAccount,
} = require("../controllers/auth.controller");

const {
  protect,
} = require("../middleware/auth.middleware");

const {
  authLimiter,
} = require("../middleware/rateLimiter");

/* AUTH */

router.post(
  "/register",
  authLimiter,
  registerUser
);

router.post(
  "/login",
  // authLimiter,
  loginUser
);

router.post(
  "/verify-phone",
  authLimiter,
  verifyPhone
);

router.put(
  "/change-password",
  protect,
  changePassword
);

router.delete(
  "/delete-account",
  protect,
  deleteAccount
);

/* PROFILE */

router.get(
  "/profile",
  protect,
  getProfile
);

module.exports = router;