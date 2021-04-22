/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-expressions */
import React from "react";
import { connect } from "react-redux";
import { setProducts } from "../store/products";
import { Link } from "react-router-dom";

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const products = this.props.products;
    return (
      <div>
        <h1>Dreams</h1>
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <Link to={`/dreams/${product.id}`}>
                <h1>{product.productName}</h1>
                <img src={product.imageURL} />
              </Link>
              <p>Price: ${product.unitPrice / 100}</p>
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
