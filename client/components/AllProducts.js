import React from "react";
import { connect } from "react-redux";
import { setProducts } from "../store/products";

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const products = this.props.products;
    return (
      <div>
        <h1>All Products</h1>
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <h1>{product.productName}</h1>
              <img src={product.imageURL} />
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
