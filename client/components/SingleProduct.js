/* eslint-disable lines-between-class-members */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSingleProduct } from "../store/singleProduct";

export class SingleProduct extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    try {
      this.props.loadSingleProduct(this.props.match.params.productId);
    } catch (error) {
      console.error(error);
    }
  }

  handleClick(event) {
    //event.preventDefault()
    // console.log(this.props.singleProduct);
    const newCartItem = { productId: this.props.singleProduct.id, quantity: 1 };

    let existing = localStorage.getItem("cart");
    existing = existing ? existing.split(",") : [];

    existing.push(newCartItem);

    localStorage.setItem("cart", JSON.stringify(existing));
    //localStorage.setItem("cart", JSON.stringify(newCartItem));
    console.log("local storage", localStorage);
  }

  render() {
    const product = this.props.singleProduct;
    console.log("product is ", product);
    return product.id !== undefined ? (
      <div>
        <div className="singleProduct">
          <img src={product.imageURL}></img>
          <h2>{product.productName}</h2>
          <h2>Type: {product.type}</h2>
          <h3>${product.unitPrice / 100}</h3>
          <h3>{product.description}</h3>
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
