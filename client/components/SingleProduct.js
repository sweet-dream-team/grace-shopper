/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = (props) => {
  const product = props.singleProduct;
  return (
    <div>
      <div className="singleProduct">
        <img src={product.imageUrl}></img>
        <h2>{product.name}</h2>
        <h2>Type: {product.type}</h2>
        <h3>${product.price}</h3>
        <h3>{product.description}</h3>
      </div>
    </div>
  );
};

export default SingleProduct;
