const router = require("express").Router();
const {
  models: { Order, User },
} = require("../db");

// GET routes

router.get("/", async (req, res, next) => {
  try {
    const cart = await Order.findAll({
      where: {
        // where userId is the id of the user
        userId: ,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
