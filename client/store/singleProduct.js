/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import axios from "axios";
// import history from "../history";
// import {history} from 'react-router-dom'

/** Action Types */
const GET_PRODUCT = "GET_PRODUCT";

const EDIT_PRODUCT = "EDIT_PRODUCT";

const DELETE_PRODUCT = "DELETE_PRODUCT";

/** Action Creators */

export const _getProduct = (singleProduct) => {
  return {
    type: GET_PRODUCT,
    singleProduct,
  };
};

export const _editSingleProduct = (singleProduct) => {
  return {
    type: EDIT_PRODUCT,
    singleProduct,
  };
};

export const _deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};

/** Thunks */

export const getSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      console.log("data: ", data);
      dispatch(_getProduct(data[0]));
    } catch (err) {
      console.log("Error fetching single product via thunk");
    }
  };
};

export const getSingleCartProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      //console.log("data: ", data);
      return data;
    } catch (err) {
      console.log("Error fetching single product via thunk");
    }
  };
};

export const editSingleProductThunk = (id, info) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/products/${id}/edit`, info);
      dispatch(_editSingleProduct(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteDreamThunk = (id, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      console.log("data: ", data);
      // history.push('/dreams')
      dispatch(_deleteProduct(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.singleProduct;
    case EDIT_PRODUCT:
      return action.singleProduct;
    default:
      return state;
  }
};
