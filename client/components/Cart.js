import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { setProducts } from "../store/products";

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
    // this.props.getProducts();
    this.setState({ cart: JSON.parse(localStorage.getItem("cart")) });
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
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    const totalPrice =
      cartItems.reduce((total, item) => {
        return total + item.unitPrice * item.quantity;
      }, 0) / 100;

    const isLoggedIn = this.props.isLoggedIn;
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
                      <h4>Price: ${item.unitPrice / 100}</h4>
                    </div>
                    <h3>${(item.unitPrice * item.quantity) / 100}</h3>
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
            <p>Total: ${totalPrice} </p>
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
    // products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getProducts: () => dispatch(setProducts()),
    // getCart thunk
    // removeItem thunk
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
