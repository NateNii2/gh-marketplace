const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  deleteOrder,
  markDelivered,
  initPaystackPayment,
  verifyPaystack,
} = require("../controllers/order.controller");

const {
  protect,
  admin,
} = require("../middleware/auth.middleware");

/* DEBUG */
console.log("ROUTE CHECK:", {
  createOrder,
  getMyOrders,
  getAllOrders,
  deleteOrder,
  markDelivered,
  initPaystackPayment,
  verifyPaystack,
  protect,
  admin,
});

/* USER */

router.post("/", protect, createOrder);

router.get("/my", protect, getMyOrders);

/* PAYSTACK */

router.post("/paystack/init", protect, initPaystackPayment);

router.get("/paystack/verify/:reference", protect, verifyPaystack);

/* ADMIN */

router.get("/", protect, admin, getAllOrders);

router.delete("/:id", protect, admin, deleteOrder);

router.put("/:id/deliver", protect, admin, markDelivered);

module.exports = router;