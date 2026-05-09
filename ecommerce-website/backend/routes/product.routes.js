const router = require("express").Router();
const ctrl = require("../controllers/product.controller");
const { protect, admin } = require("../middleware/auth.middleware");

console.log({
  protect,
  admin,
  createProduct: ctrl.createProduct,
});


router.get("/", ctrl.getProducts);
router.get("/:id", ctrl.getProduct);
router.post("/", protect, admin, ctrl.createProduct);
router.put("/:id", protect, admin, ctrl.updateProduct);
router.delete("/:id", protect, admin, ctrl.deleteProduct);

module.exports = router;
