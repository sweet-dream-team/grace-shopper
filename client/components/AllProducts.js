/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-expressions */
import React from "react";
import { connect } from "react-redux";
import { setProducts, deleteDreamThunk } from "../store/products";
import { Link } from "react-router-dom";

export class AllProducts extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  handleClick(id) {
    console.log(this.props.products);
    const newCartItem = {
      productId: id,
      quantity: 1,
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
        currentItem.quantity++;
        return localStorage.setItem("cart", JSON.stringify(existingCart));
      }
    }
    existingCart.push(newCartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));
  }
  render() {
    const products = this.props.products;

    return (
      <div>
        <h1>Dreams</h1>
        <div className="allProductsContainer">
          {products.map((product) => (
            <div key={product.id}>
              <Link to={`/dreams/${product.id}`}>
                <h1>{product.productName}</h1>
                <img src={product.imageURL} />
              </Link>
              <p>Price: ${product.unitPrice / 100}</p>

              <div className="addToCart">
                <button
                  type="button"
                  onClick={() => this.handleClick(product.id)}
                >
                  Add To Cart <i className="fa fa-cart-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: () => dispatch(setProducts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts);
