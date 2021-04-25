/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-expressions */
import React from "react";
import { connect } from "react-redux";
import { setProducts, deleteDreamThunk } from "../store/products";
import { Link } from "react-router-dom";

export class Admin extends React.Component {
    constructor(){
        super()
 this.handleDelete = this.handleDelete.bind(this)

    }
  componentDidMount() {
    this.props.getProducts();
  }

  handleDelete(evt) {
  evt.preventDefault();
  console.log('evt id: ', evt.target)
  this.props.deleteDream(evt.target.id)
  this.props.history.push('/admin')
}

  render() {
    const products = this.props.products;
    return (
      <div>
        <h1>Dreams</h1>
        <div>
     <Link to={`/admin/create`}><button type="button" > Add New Dream </button></Link>

          {products.map((product) => (
            <div key={product.id}>
              <Link to={`/dreams/${product.id}`}>
                <h1>{product.productName}</h1>
                <img src={product.imageURL} />
              </Link>
              <p>Price: ${product.unitPrice / 100}</p>
             <button type="button" id={product.id} onClick={this.handleDelete}> Delete </button>
            <Link to={`/${product.id}/edit`}><button type="button" id={product.id}> Edit </button></Link>
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
    deleteDream: (id) => dispatch(deleteDreamThunk(id, history)) 

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
