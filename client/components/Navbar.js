/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
//import { getCart } from "../store/cart";

class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
    };
  }

  updateQuantity() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    let totalQuantity = cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    this.setState({ quantity: totalQuantity });
  }

  render() {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    return (
      <div>
        <nav>
          <div className='outside'>
            <Link to="/"><img src='/logo.png' className='logo'/></Link>
            <div>
              <Link to="/dreams">Dreams</Link>
              {this.props.isLoggedIn ? (
                <a href="#" onClick={this.props.handleClick}>
                  Logout
                </a>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                </>
              )}
              <Link to="/cart">
                <i className="fa fa-shopping-cart"></i>
                <span className="badgeWarning" id="cartCount">
                  {totalQuantity}
                </span>
              </Link>
            </div>
          </div>
       </nav>
        {/* <hr /> */}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    //cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {
    //getCart: (userId) => dispatch(getCart(userId)),

    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
