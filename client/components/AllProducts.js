/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable lines-between-class-members */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-expressions */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setProducts } from "../store/products";
import { getCart, updateOrderHistory } from "../store/cart";

export class AllProducts extends React.Component {
  constructor() {
    super();
    this.cartToDatabase = this.cartToDatabase.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    try {
      this.props.getProducts();
      if (this.props.auth.id) {
        this.props.getCart(this.props.auth.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleClick(id) {
    alert("a dream was added to your cart");
    console.log("props.products", this.props.products);
    const newCartItem = {
      ...this.props.products[id - 1],
      //productId: id,
      quantity: 1,
    };

    let existingCart = JSON.parse(localStorage.getItem("cart"));

    if (!existingCart) {
      existingCart = [];
      existingCart.push(newCartItem);
      this.cartToDatabase(existingCart);
      return localStorage.setItem("cart", JSON.stringify(existingCart));
    }

    for (let i = 0; i < existingCart.length; i++) {
      let currentItem = existingCart[i];
      if (currentItem.id === newCartItem.id) {
        currentItem.quantity++;
        this.cartToDatabase(existingCart);
        return localStorage.setItem("cart", JSON.stringify(existingCart));
      }
    }

    existingCart.push(newCartItem);
    this.cartToDatabase(existingCart);
    localStorage.setItem("cart", JSON.stringify(existingCart));
  }

  cartToDatabase(newCart) {
    let cartId;
    if (this.props.cart.id) {
      cartId = this.props.cart.id;
    }
    newCart.map((eachObject) => {
      this.props.changeCart(eachObject, cartId);
    });

    this.props.getCart(this.props.auth.id);
  }

  render() {
    //console.log("Redux state is currently: ", this.props);
    const products = this.props.products;

    return (
      <div className="all-products-view">
        <h1>Dreams</h1>
        <div className="all-products-container">
          {products.map((product) => (
            <div key={product.id} className="single-product">
              <Link to={`/dreams/${product.id}`}>
                <img src={product.imageURL} />
              </Link>
              <div className="single-product-details">
                <h2>{product.productName}</h2>
                <p>${product.unitPrice / 100}</p>
                <div className="addToCart">
                  <button
                    type="button"
                    onClick={() => {
                      this.handleClick(product.id);
                    }}
                  >
                    Add to Cart <i className="fa fa-cart-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    auth: state.auth,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(setProducts()),
    getCart: (userId) => dispatch(getCart(userId)),
    changeCart: (eachObj, dbCartId) =>
      dispatch(updateOrderHistory(eachObj, dbCartId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
