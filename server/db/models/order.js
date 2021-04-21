const Sequelize = require('sequelize')
const db = require('../db')


const Order = db.define('order', {
    billingStreet: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      } 
    },
    billingSecondaryStreet: {
       type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      } 
    },
    billingCity: {
       type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      } 
    },
    billingZip: {
       type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      } 
    },
    paymentCCNumber: {
       type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isCreditCard: true
      } 
    },
    paymentExpiry: {
         type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      } 
    },
    paymentCVV: {
         type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      } 
    }
  }

  module.exports = Order