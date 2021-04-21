import axios from "axios";

// action types
const SET_PRODUCTS = "SET_PRODUCTS";

// action creators
export const _setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

// thunks
export const setProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products");
      dispatch(_setProducts(data));
    } catch (err) {
      console.log(err);
    }
  };
};

// reducer
export default (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
};
