const Sequelize = require("sequelize");
const db = require("../db");

const OrderHistory = db.define("orderhistory", {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  //   dateSubmitted: {
  //     type: Sequelize.DATE,
  //     allowNull: false,
  //   },
});

module.exports = OrderHistory;
