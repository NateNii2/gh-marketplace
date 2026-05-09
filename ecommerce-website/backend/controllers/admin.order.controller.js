const Order = require("../models/Order");

// GET ALL ORDERS
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "email")
      .sort({ createdAt: -1 });
      console.log("ADMIN ORDERS:", orders.length);

    res.json(orders); // ✅ return array directly
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE ORDER
exports.getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "email"
  );

  if (!order)
    return res.status(404).json({ message: "Order not found" });

  res.json(order);
};

// UPDATE ORDER (MARK DELIVERED)
exports.updateOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order)
    return res.status(404).json({ message: "Order not found" });

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  await order.save();

  res.json(order);
};

// DELETE ORDER
exports.deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order)
    return res.status(404).json({ message: "Order not found" });

  await order.deleteOne();

  res.json({ message: "Order deleted" });
};
