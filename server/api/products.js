const router = require("express").Router();
const { Product } = require("../db");

// GET routes

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const singleProduct = await Product.findAll({
      where: {
        id: req.params.productId,
      },
    });
    res.json(singleProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
