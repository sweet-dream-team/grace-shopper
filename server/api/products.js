const router = require("express").Router();
const {
  models: { Product },
} = require("../db");

// const colors = require('colors')

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

/** Put Routes */

router.put('/:productId/edit', async(req, res, next) =>{
  try {
    console.log('this route is running!')
    const dream = await Product.findByPk(req.params.productId);
    if(!dream){
      console.log('theres no dream')
      const err = new Error(`There's no dream here with that ID!`)
      err.status = 404
      throw error
    }
    const updatedDream = await dream.update(req.body);
    if(!updatedDream){
      const err = new Error(`You can't update that one, buddy`)
      error.status = 404
      throw error
    }
  res.json(updatedDream)
  } catch (error) {
    next(error)
  }
})



/** Delete Routes */

router.delete('/:productId', async (req, res, next) => {
  try {
    const dream = await Product.findByPk(req.params.productId);
    console.log("dream: ", dream)
    if(!dream){
    const err = new Error(`There's no dream here with that ID!!`)
    err.status = 404
    throw error
  }
    await dream.destroy();
    res.json(dream);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
