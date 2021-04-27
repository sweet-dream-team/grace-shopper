const router = require("express").Router();
const {
  models: { Order, User, OrderHistory },
} = require("../db");

//GET routes /api/cart
// const requireToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization;
//     const user = await User.byToken(token);
//     req.user = user;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

router.get("/:userId", async (req, res, next) => {
  try {
    const cart = await Order.findOrCreate({
      where: {
        status: "OPEN",
        userId: req.params.userId,
      },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.post("/:orderId", async (req, res, next) => {
  try {
    console.log(req.body);
    const orderHist = await OrderHistory.findOrCreate({
      where: {
        orderId: req.params.orderId,
        productId: req.body.id,
      },
      defaults: {
        price: req.body.unitPrice,
        quantity: req.body.quantity,
      },
    });
    res.json(orderHist);
  } catch (err) {
    next(err);
  }
});

router.put("/edit/:orderId", async (req, res, next) => {
  try {
    const updatedQuantityProduct = await OrderHistory.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.body.id,
      },
    });
    res.send(await updatedQuantityProduct.update(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
