/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import axios from "axios";

// action types
const SET_PRODUCTS = "SET_PRODUCTS";

const DELETE_PRODUCT = 'DELETE_PRODUCT'


// action creators
export const _setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const _deleteProduct = (product) =>{
return {
  type: DELETE_PRODUCT,
  product
}
}
// thunks
export const setProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(_setProducts(data));
    } catch (err) {
      console.log("Error fetching all products via thunk");
    }
  };
};

export const deleteDreamThunk = (id, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      console.log('data: ', data)
      dispatch(_deleteProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// reducer
export default (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case DELETE_PRODUCT: 
      return state.filter((product) => product.id !== action.product.id)
    default:
      return state;
  }
};
