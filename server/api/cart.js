const router = require("express").Router();
const {
  models: { Order, User },
} = require("../db");

// GET routes

router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(localStorage.getItem("token"));

    // change to findAll once we figure out userId part
    // const cart = await Order.findOne({
    //   where: {
    //     // user: user,
    //     status: "OPEN",
    //   },
    // });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// POST routes

module.exports = router;
