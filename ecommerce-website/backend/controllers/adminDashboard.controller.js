const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getDashboardStats = async (req, res) => {
  try {
    // BASIC COUNTS
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();

    // DATE RANGES
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // REVENUE CALCULATIONS
    const revenueToday = await Order.aggregate([
      { $match: { isPaid: true, createdAt: { $gte: startOfToday } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const revenueWeek = await Order.aggregate([
      { $match: { isPaid: true, createdAt: { $gte: startOfWeek } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const revenueMonth = await Order.aggregate([
      { $match: { isPaid: true, createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    // TOTAL REVENUE
    const totalRevenueAgg = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    const totalRevenue = totalRevenueAgg[0]?.total || 0;

    // AVERAGE ORDER VALUE
    const avgOrderAgg = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: null,
          avg: { $avg: "$totalPrice" }
        }
      }
    ]);

    const averageOrderValue = avgOrderAgg[0]?.avg || 0;

    // BEST SELLING PRODUCTS
    const bestSellers = await Order.aggregate([
      { $match: { isPaid: true } },
      { $unwind: "$orderItems" },
      {
        $group: {
          _id: "$orderItems.product",
          totalSold: { $sum: "$orderItems.qty" },
          name: { $first: "$orderItems.name" }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 }
    ]);

    // SALES BY REGION
    const salesByRegion = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: "$shippingAddress.region",
          revenue: { $sum: "$totalPrice" }
        }
      },
      { $sort: { revenue: -1 } }
    ]);

    // MONTHLY REVENUE CHART DATA
    const monthlyRevenue = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          revenue: { $sum: "$totalPrice" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json({
      users,
      products,
      orders,
      revenue: {
        today: revenueToday[0]?.total || 0,
        week: revenueWeek[0]?.total || 0,
        month: revenueMonth[0]?.total || 0,
        total: totalRevenue
      },
      averageOrderValue,
      bestSellers,
      salesByRegion,
      monthlyRevenue
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
