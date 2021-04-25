/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import axios from "axios";

/** Action Types */
const GET_PRODUCT = "GET_PRODUCT";

const EDIT_PRODUCT = "EDIT_PRODUCT";

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

/** Thunks */

export const getSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(_getProduct(data[0]));
    } catch (err) {
      console.log("Error fetching single product via thunk");
    }
  };
};

export const editSingleProductThunk = (id, info) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/products/${id}/edit`, info);
      dispatch(editProduct(data));
    } catch (err) {
      console.log(err);
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
