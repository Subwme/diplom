const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/category", require("./category.routes"));
router.use("/product", require("./product.routes"));
router.use("/comment", require("./comment.routes"));

module.exports = router;
