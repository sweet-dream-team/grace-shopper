const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

/** Post Routes */

  router.post('/create', async (req, res, next) => {
  try {
      const dream = {
      productName: req.body.productName,
      description: req.body.description,
      unitPrice: req.body.unitPrice,
    };
    const newDream = await Product.create(dream)
    res.json(newDream);
  } catch (error) {
    next(error);
  }
});

module.exports = router;