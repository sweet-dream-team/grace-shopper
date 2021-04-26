const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'TBD',
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'This dream is AWAITing a description!'
  },
  type: {
    type: Sequelize.ENUM("SWEET", "NIGHTMARE"),
    allowNull: false,
    defaultValue: "SWEET"
  },
  duration: Sequelize.INTEGER,
  unitPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1099
  },
  imageURL: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: "/defaultsheepimage.png",
  },
  stockQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: 0,
    },
  },
});

module.exports = Product;
