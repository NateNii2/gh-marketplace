const Product = require("../models/Product");
const { sendSMS } = require("../services/sms.service");

/* =========================
   GET ALL PRODUCTS
========================= */
exports.getProducts = async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query;

    let filter = {};

    // SEARCH
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // CATEGORY
    if (category) {
      filter.category = category;
    }

    // PRICE RANGE
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let query = Product.find(filter);

    // SORTING
    if (sort === "price_asc") query = query.sort({ price: 1 });
    if (sort === "price_desc") query = query.sort({ price: -1 });
    if (sort === "newest") query = query.sort({ createdAt: -1 });

    const products = await query;

    res.json(products);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   GET SINGLE PRODUCT
========================= */
exports.getProduct = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* =========================
   CREATE PRODUCT (ADMIN)
========================= */
exports.createProduct = async (req, res) => {
  try {

    const product = new Product(req.body);
    const saved = await product.save();

    res.status(201).json(saved);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =========================
   UPDATE PRODUCT (ADMIN)
========================= */
exports.updateProduct = async (req, res) => {
  try {

    // Get existing product first
    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const oldPrice = existingProduct.price;
    const newPrice = req.body.price ?? oldPrice;

    // Update product
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // ✅ PRICE DROP SMS LOGIC
    if (newPrice < oldPrice) {

      try {

        await sendSMS(
          "233XXXXXXXXX", // replace with real user/subscriber list later
          `Price Drop! ${updated.name} is now GHS ${newPrice}. Visit GH Marketplace now!`
        );

      } catch (smsError) {
        console.error("SMS failed:", smsError.message);
      }

    }

    res.json(updated);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* =========================
   DELETE PRODUCT (ADMIN)
========================= */
exports.deleteProduct = async (req, res) => {
  try {

    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};