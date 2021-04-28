/* eslint-disable no-else-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable lines-between-class-members */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import cart, { getCart, updateOrderHistory } from "../store/cart";
import cartArray, { getCartArray } from "../store/cartArray";
import { getSingleCartProduct } from "../store/singleProduct";

export class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.setState({ cart: JSON.parse(localStorage.getItem("cart")) });

    if (this.props.auth.id) {
      this.props.getCart(this.props.auth.id);
    }

    if (this.props.cart.id) {
      this.props.getCartItems(this.props.cart.id);
    }
  }

  handleChange(event) {
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    let updatedCartItems = [];
    //event.target.name equals the id
    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i];
      if (item.id === Number(event.target.name)) {
        item.quantity = Number(event.target.value);
      }
      updatedCartItems.push(item);
    }
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    this.setState({ cart: JSON.parse(localStorage.getItem("cart")) });
  }

  handleDelete(event) {
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    let updatedCartItems = [];
    //event.target.name equals the id
    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i];
      if (item.id !== Number(event.target.name)) {
        updatedCartItems.push(item);
      }
    }
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    this.setState({ cart: JSON.parse(localStorage.getItem("cart")) });
  }

  render() {
    const isLoggedIn = this.props.isLoggedIn;

    let cartItems = [];

    if (isLoggedIn) {
      console.log("HI IM HERE");

      const cartItemsMessy = this.props.cartArray;
      const productsArray = this.props.products;
      cartItemsMessy.map((eachCartItem) => {
        for (let i = 0; i < productsArray.length; i++) {
          if (eachCartItem.productId === productsArray[i].id) {
            productsArray[i]["quantity"] = eachCartItem.quantity;
            cartItems.push(productsArray[i]);
          }
        }
      });
    } else {
      cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    }
    const totalQuantity = cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    const totalPrice =
      cartItems.reduce((total, item) => {
        return total + item.unitPrice * item.quantity;
      }, 0) / 100;

    return (
      <div className="cart">
        <div className="cart-header">
          <h3>MY CART: {totalQuantity} items</h3>
        </div>
        <div className="cart-bottom">
          <div className="cart-container">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.imageURL} />
                  <div className="cart-item-main">
                    <div className="cart-item-details">
                      <h3>{item.productName}</h3>
                      <p>
                        Price: <span>${item.unitPrice / 100}</span>
                      </p>
                    </div>
                    <h7>${(item.unitPrice * item.quantity) / 100}</h7>
                    <div className="cart-item-update">
                      <select
                        name={item.id}
                        value={item.quantity}
                        onChange={this.handleChange}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <button
                        type="button"
                        className="delete"
                        name={item.id}
                        onClick={this.handleDelete}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Cart is empty</div>
            )}
          </div>
          <div className="order-summary">
            <h3>ORDER SUMMARY</h3>
            <p>
              Total: <span>${totalPrice}</span>{" "}
            </p>
            <button type="button" className="checkout">
              {isLoggedIn ? (
                <Link to="/checkout">Go to Checkout</Link>
              ) : (
                <Link to="/checkout-login">Go to Checkout</Link>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    isLoggedIn: !!state.auth.id,
    cart: state.cart,
    cartArray: state.cartArray,
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(getSingleCartProduct(id)),
    getCart: (userId) => dispatch(getCart(userId)),
    changeCart: (eachObj, dbCartId) =>
      dispatch(updateOrderHistory(eachObj, dbCartId)),
    getCartItems: (orderId) => dispatch(getCartArray(orderId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
