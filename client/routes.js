/* eslint-disable react/jsx-filename-extension */
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import SingleProduct from "./components/SingleProduct";
import AllProducts from "./components/AllProducts";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import { me } from "./store";
import EditProduct from "./components/EditProduct";
import Admin from "./components/Admin";
import CreateDream from "./components/CreateDream";
import AllUsers from "./components/AllUsers";
import AuthFormAtCheckout from "./components/AuthFormAtCheckout";

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/dreams" component={AllProducts} />
          <Route exact path="/dreams/:productId" component={SingleProduct} />
          <Route exact path="/dreams/:productId/edit" component={EditProduct} />
          <Route exact path="/:productId/edit" component={EditProduct} />
          <Route
            path="/cart"
            render={(props) => <Cart isLoggedIn={isLoggedIn} />}
          />

          <Route path="/checkout" component={Checkout} />
          <Route path="/checkout-login" component={AuthFormAtCheckout} />
          {this.props.user.isAdmin && (
            <Switch>
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/admin/create" component={CreateDream} />
              <Route exact path="/admin/users" component={AllUsers} />
            </Switch>
          )}
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
    user: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
