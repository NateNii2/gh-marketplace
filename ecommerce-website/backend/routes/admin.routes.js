const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/auth.middleware");

const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllOrders,
  getAllProducts,
  markOrderDelivered,
  deleteProduct,
  createProduct,
  updateProduct,
} = require("../controllers/admin.controller");

// USERS
router.get("/users", protect, admin, getAllUsers);
router.put("/users/:id", protect, admin, updateUserRole);
router.delete("/users/:id", protect, admin, deleteUser);

// ORDERS
router.get("/orders", protect, admin, getAllOrders);
router.put("/orders/:id/deliver", protect, admin, markOrderDelivered);

// PRODUCTS
router.get("/products", protect, admin, getAllProducts);
router.post("/products", protect, admin, createProduct);
router.put("/products/:id", protect, admin, updateProduct);
router.delete("/products/:id", protect, admin, deleteProduct);

module.exports = router;