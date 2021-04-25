/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable lines-between-class-members */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSingleProduct } from "../store/singleProduct";

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: Number(this.props.match.params.productId),
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

  handleClick(event) {
    const newCartItem = {
      productId: this.state.productId,
      quantity: this.state.quantity,
    };

    let existing = JSON.parse(localStorage.getItem("cart"));
    if (!existing) {
      existing = [];
      existing.push(newCartItem);
      console.log("Im in first if, cart creation");
    } else {
      for (let i = 0; i < existing.length; i++) {
        if (existing[i].productId === newCartItem.productId) {
          existing[i].quantity += newCartItem.quantity;
        } else {
          existing.push(newCartItem);
        }
      }
      // existing.map((cartItem) => {
      //   if (cartItem.productId === newCartItem.productId) {
      //     cartItem.quantity += newCartItem.quantity;
      //     console.log("Im in map, inside of if, ids do match");
      //   } else if (cartItem.productId !== newCartItem.productId) {
      //     existing.push(newCartItem);
      //     console.log("Im in else statement, Ids didnt match");
      //   }
      // });
    }

    console.log("state is", this.state);
    localStorage.setItem("cart", JSON.stringify(existing));
  }

  render() {
    const product = this.props.singleProduct;
    const { quantity } = this.state;
    //console.log("product is ", product);
    return product.id !== undefined ? (
      <div>
        <div className="singleProduct">
          <img src={product.imageURL}></img>
          <h2>{product.productName}</h2>
          <h2>Type: {product.type}</h2>
          <h3>${product.unitPrice / 100}</h3>
          <h3>{product.description}</h3>
          <label htmlFor="quantity">Quantity: </label>
          <select name="quantity" value={quantity} onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type="button" onClick={() => this.handleClick()}>
            Add To Cart <i className="fa fa-cart-plus"></i>
          </button>
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

/// THIS SOLUTION WORKS FOR ONSUBMIT FUNCTION ///
// const newCartItem = { productId: this.props.singleProduct.id, quantity: 1 };

// let existing = JSON.parse(localStorage.getItem("cart"));
// if (!existing) {
//   existing = [];
// }
// existing.push(newCartItem);

// localStorage.setItem("cart", JSON.stringify(existing));

//console.log("PARSING", JSON.parse(localStorage.getItem("cart")));
