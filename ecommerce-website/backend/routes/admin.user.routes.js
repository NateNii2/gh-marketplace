const router = require("express").Router();
const { protect, admin } = require("../middleware/auth.middleware");
const ctrl = require("../controllers/admin.user.controller");

router.get("/", protect, admin, ctrl.getUsers);
router.get("/:id", protect, admin, ctrl.getUser);
router.put("/:id", protect, admin, ctrl.updateUser);
router.delete("/:id", protect, admin, ctrl.deleteUser);

module.exports = router;
