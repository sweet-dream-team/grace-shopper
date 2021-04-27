/* eslint-disable no-plusplus */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */

import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSingleProduct } from "../store/singleProduct";
import history from "../history";

export class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    try {
      this.props.loadSingleProduct(this.props.match.params.productId);
    } catch (error) {
      console.error(error);
    }
  }

  handleChange(event) {
    this.setState({ quantity: event.target.value });
  }

  handleClick() {
    const newCartItem = {
      ...this.props.singleProduct,
      productId: this.props.singleProduct.id,
      quantity: Number(this.state.quantity),
    };

    let existingCart = JSON.parse(localStorage.getItem("cart"));

    if (!existingCart) {
      existingCart = [];
      existingCart.push(newCartItem);
      return localStorage.setItem("cart", JSON.stringify(existingCart));
    }

    for (let i = 0; i < existingCart.length; i++) {
      let currentItem = existingCart[i];
      if (currentItem.productId === newCartItem.productId) {
        currentItem.quantity += Number(this.state.quantity);
        return localStorage.setItem("cart", JSON.stringify(existingCart));
      }
    }
    existingCart.push(newCartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));
  }

  render() {
    const product = this.props.singleProduct;
    const { quantity } = this.state;

    return product.id !== undefined ? (
      <div>
        <Link to="/dreams">Back to Dreams</Link>
        <div className="singleProduct">
          <img src={product.imageURL} />
          <h2>{product.productName}</h2>
          <h2>Type: {product.type}</h2>
          <h3>${product.unitPrice / 100}</h3>
          <h3>{product.description}</h3>

          <div className="addToCart">
            <select
              name="quantity"
              value={quantity}
              onChange={this.handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>

            <button type="button" onClick={() => this.handleClick()}>
              <Link to="/dreams">
                Add To Cart <i className="fa fa-cart-plus"></i>
              </Link>
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div>
        <h2>Sorry, seems like weve run out of stock :(</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singleProduct: state.singleProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadSingleProduct: (id) => dispatch(getSingleProduct(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
