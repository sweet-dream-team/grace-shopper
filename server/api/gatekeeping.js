const router = require("express").Router();
const {
  models: { Product, User },
} = require("../db");


/** Gatekeeping Middleware */
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch(error) {
    next(error);
  }
};

const isAdmin = (req, res, next) =>{
  if(!req.user.isAdmin) {
    return res.status(403).send('You are NOT allowed to be here >:(')
  } else {
    next()
  }
}
