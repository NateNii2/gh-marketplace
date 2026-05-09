const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/product");
const products = require("./data/products");

dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected (Seeder)"))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Products imported successfully");
    process.exit();
  } catch (error) {
    console.error("Seeder error:", error);
    process.exit(1);
  }
};

importData();
