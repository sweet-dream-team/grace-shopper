//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/user')
const Product = require('./models/product')
const Order = require('./models/order')
const OrderHistory =require('./models/orderhistory')
const Payment = require('./models/payment')
//associations could go here!

Order.belongsTo(User);
User.hasMany(Order);
Product.belongsToMany(Order, { through : OrderHistory })
Order.belongsToMany(Product, { through : OrderHistory })
// Order.hasMany(OrderHistory)
// Product.hasMany(OrderHistory)
// OrderHistory.belongsTo(Order)
// OrderHistory.belongsTo(Product)
Payment.hasMany(Order)
Order.belongsTo(Payment)

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderHistory,
    Payment
  },
}


