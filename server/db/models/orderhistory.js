const Sequelize = require('sequelize')
const db = require('../db')


const OrderHistory = db.define('orderhistory', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dateSubmitted: {
        type: Sequelize.DATE,
        allowNull: false
    }
})

module.exports = OrderHistory