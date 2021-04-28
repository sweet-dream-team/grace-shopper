/* eslint-disable import/prefer-default-export */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-underscore-dangle */
import axios from "axios";
// import { head } from "../../server/api/cart";

const GET_CART_ITEMS = "GET_CART_ITEMS";

const _getCartArray = (cartArr) => {
  return {
    type: GET_CART_ITEMS,
    cartArr,
  };
};

export const getCartArray = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/user/${orderId}`);
      dispatch(_getCartArray(data));
    } catch (err) {
      console.log("Error getting cart via thunk");
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return action.cartArr;
    default:
      return state;
  }
};
