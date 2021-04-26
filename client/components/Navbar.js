import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

class Navbar extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   quantity: 0,
    // };
  }

  // updateQuantity() {
  //   const cart = JSON.parse(localStorage.getItem("cart"));
  //   let totalQuantity = cart.reduce((total, item) => {
  //     return total + item.quantity;
  //   }, 0);
  //   this.setState({ quantity: totalQuantity });
  // }

  render() {
    // rendering a static quantity:
    // const cart = JSON.parse(localStorage.getItem("cart"));
    // let totalQuantity = cart.reduce((total, item) => {
    //   return total + item.quantity;
    // }, 0);

    // using state:
    // const { quantity } = this.state;

    return (
      <div>
        <nav>
          <div>
            <Link to="/">Dreamporium</Link>
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
                  {/* {totalQuantity} */}
                </span>
              </Link>
            </div>
          </div>
        </nav>
        <hr />
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
