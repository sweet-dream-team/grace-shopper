/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import axios from "axios";

const GET_PRODUCT = "GET_PRODUCT";

export const _getProduct = (singleProduct) => {
  return {
    type: GET_PRODUCT,
    singleProduct,
  };
};

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

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.singleProduct;
    default:
      return state;
  }
};
