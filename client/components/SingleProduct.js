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
        <h2>{product.name}</h3>
        <h2>Type: {product.type}</h3>
        <h3>${product.price}</h2>
        <h3>{product.description}</h2>
      </div>
    </div>
  );
};

export default SingleProduct;
