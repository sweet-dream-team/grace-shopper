/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

class Navbar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <nav>
          <div className="outside">
            <Link to="/">
              <img src="/logo.png" className="logo" />
            </Link>
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
              </Link>
            </div>
          </div>
        </nav>
        {/* <hr /> */}
      </div>
    );
  }
}

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
