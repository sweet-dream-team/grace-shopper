const Sequelize = require('sequelize')
const db = require('../db')

const Payment = db.define('payment', {
    paymentCCNumber: {
        type: Sequelize.INTEGER,
       allowNull: false,
       validate: {
         notEmpty: true,
         isCreditCard: true
       } 
     },
     paymentExpiryMonth: {
          type: Sequelize.INTEGER,
       allowNull: false,
       validate: {
         notEmpty: true,
         min: 1,
         max: 12
       } 
     },
      paymentExpiryYear: {
              type: Sequelize.INTEGER,
       allowNull: false,
       validate: {
         notEmpty: true,
         min: 2021,
         max: 2050
       } 
      },
     paymentCVV: {
          type: Sequelize.INTEGER,
       allowNull: false,
       validate: {
         notEmpty: true
       } 
     },
     billingStreet: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        } 
      },
      billingSecondaryStreet: {
         type: Sequelize.STRING,
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
    })

    module.exports = Payment
