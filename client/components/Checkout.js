import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export class Checkout extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {}

  render() {
    const cartItems = JSON.parse(localStorage.getItem("cart"));
    const totalQuantity = cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    const totalPrice =
      cartItems.reduce((total, item) => {
        return total + item.unitPrice * item.quantity;
      }, 0) / 100;

    console.log(this.state);

    return (
      <div className="whole-checkout">
        <button type="button" className="back-to-cart">
          <Link to="/cart">Back to Cart</Link>
        </button>

        {/* <div className="email">
          <h4>EMAIL ADDRESS</h4>
          <h5>/users email address/</h5>
        </div> */}

        {/* PLACEHOLDER FOR PAYMENT <form>
          <div className="payment-form">
            <input />
          </div>
        </form> */}

        <div className="checkout-summary">
          <div className="checkout-container">
            <h4>ORDER SUMMARY</h4>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <h5>{item.productName}</h5>
                  <h6>Quantity: {item.quantity}</h6>
                  <p>${(item.unitPrice * item.quantity) / 100}</p>
                </div>
              ))
            ) : (
              <div>Cart is empty</div>
            )}
          </div>
          <div className="checkout-total">
            <h4>Total Items: {totalQuantity}</h4>
            <h4>Total Price: ${totalPrice}</h4>
            <button type="button" className="submit" onClick={this.handleClick}>
              Submit Order
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Checkout;
