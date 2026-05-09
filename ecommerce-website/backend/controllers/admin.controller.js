const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

/* ==================================================
   USERS
================================================== */

/* GET ALL USERS */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

/* UPDATE USER ROLE */
exports.updateUserRole = async (req, res) => {

  try {

    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    /* PREVENT SELF ROLE CHANGE */

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot change your own role",
      });
    }

    user.role = role;

    await user.save();

    res.json({
      message: "Role updated",
    });

  } catch (err) {

    res.status(500).json({
      message: "Failed to update role",
    });
  }
};

/* DELETE USER */
exports.deleteUser = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    /* PREVENT SELF DELETE */

    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        message: "You cannot delete your own account",
      });
    }

    await user.deleteOne();

    res.json({
      message: "User removed",
    });

  } catch (err) {

    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

/* ==================================================
   ORDERS
================================================== */

exports.getAllOrders = async (req, res) => {

  try {

    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

exports.markOrderDelivered = async (req, res) => {

  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.isDelivered = true;
    order.deliveredAt = Date.now();

    await order.save();

    res.json(order);

  } catch (err) {

    res.status(500).json({
      message: "Failed to update order",
    });
  }
};

/* ==================================================
   PRODUCTS
================================================== */

exports.getAllProducts = async (req, res) => {

  try {

    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json(products);

  } catch (err) {

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

exports.createProduct = async (req, res) => {

  try {

    const {
      name,
      price,
      category,
      description,
      image,
      variants,
      inStock,
      condition,
    } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const product = await Product.create({
      name: name.trim(),
      price,
      category: category.trim(),
      description,
      image,
      variants: variants || [],
      inStock: inStock ?? true,
      condition: condition || "New",
    });

    res.status(201).json(product);

  } catch (err) {

    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

exports.updateProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    Object.assign(product, {
      name: req.body.name ?? product.name,
      price: req.body.price ?? product.price,
      category: req.body.category ?? product.category,
      description: req.body.description ?? product.description,
      image: req.body.image ?? product.image,
      inStock: req.body.inStock ?? product.inStock,
      condition: req.body.condition ?? product.condition,
      variants: req.body.variants ?? product.variants,
    });

    const updated = await product.save();

    res.json(updated);

  } catch (err) {

    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

exports.deleteProduct = async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    await product.deleteOne();

    res.json({
      message: "Product removed",
    });

  } catch (err) {

    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};