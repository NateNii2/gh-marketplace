const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  label: String, // 64GB / 128GB
  price: Number
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },

  category: {
    type: String,
    enum: [
      "New Iphones",
      "Used Iphones",
      "New android Phones",
      "Laptops",
      "Mobile Accessories",
      "Gaming Accessories",
      "Computer Accessories",
      "Perfumes",
      "Headset and Earpiece"
    ],
    required: true
  },

  description: String,

  price: { type: Number, required: true },

  variants: [variantSchema],

  condition: { type: String, enum: ["New", "Used"], default: "New" },

  image: String,

  inStock: { type: Boolean, default: true }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
