/* eslint-disable no-await-in-loop */
/* eslint-disable no-confusing-arrow */
/* eslint-disable no-underscore-dangle */
import axios from "axios";
// import { head } from "../../server/api/cart";

// action types
const UPDATE_CART = "UPDATE_CART";
const GET_CART = "GET_CART";

//action creators

const _getCart = (cart) => {
  return {
    type: GET_CART,
    cart,
  };
};

const _updateCart = (cart) => {
  return {
    type: UPDATE_CART,
    cart,
  };
};

//get cart, more like get Order
export const getCart = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/${userId}`);
      dispatch(_getCart(data[0]));
    } catch (err) {
      console.log("Error getting cart via thunk");
    }
  };
};

//edit cart
export const updateOrderHistory = (eachProduct, dbCartId) => {
  return async (dispatch) => {
    try {
      const eachPost = await axios.post(`/api/cart/${dbCartId}`, eachProduct);
      if (!eachPost.data[1]) {
        await axios.put(`/api/cart/edit/${dbCartId}`, eachProduct);
      }
    } catch (err) {
      console.log("Error updating cart via thunk");
    }
  };
};

//reducer
export default (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case UPDATE_CART:
      return [...state, action.cart]; //double check if this works
    default:
      return state;
  }
};
