const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
    productName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM('SWEET', 'NIGHTMARE'),
      allowNull: false,
    },
    duration: Sequelize.INTEGER,
    unitPrice: {
     type: Sequelize.INTEGER,
      allowNull: false,
    },
    imageURL: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: 'http://www.image.farm/images/2021/04/20/95242889b3b9800fc00b28b716ef7547.png'
    },
    stockQuantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate:{
      min: 0
      }
    }
  })

  module.exports = Product