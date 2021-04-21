const router = require("express").Router();
// const { Products } = require("../db");

module.exports = router;

// GET routes

router.get("/", async (req, res, next) => {
  try {
    const products = await Products.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});
