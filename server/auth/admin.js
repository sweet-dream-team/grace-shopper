const router = require("express").Router();
const {
  models: { Product, User },
} = require("../db");
const  { requireToken, isAdmin } = require('../api/gatekeeping')


/** Get Routes */
router.get("/users", requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "email", "password"],
    });
    console.log(users)
    res.json(users);

  } catch (err) {
    next(err);
  }
});

/** Post Routes */

  router.post('/', requireToken, isAdmin, async (req, res, next) => {
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