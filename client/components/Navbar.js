import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <nav>
      <div>
        <Link to="/">Dreamporium</Link>
        <div>
          <Link to="/dreams">Dreams</Link>
          {isLoggedIn ? (
            <a href="#" onClick={handleClick}>
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
    <hr />
  </div>
);

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
