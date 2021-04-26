import axios from "axios";

// action types
const UPDATE_CART = "UPDATE_CART";

//action creators
export const _updateCart = (cart) => {
  return {
    type: UPDATE_CART,
    cart,
  };
};

// 1) check if there's a pending order instance associated with user
// 2) if true - put route
// 3) if false - post route

//thunks
export const updateCart = (cart) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put("/api/cart", cart);
      dispatch(_updateCart(data));
    } catch (err) {
      console.log("Error updating cart via thunk");
    }
  };
};

//reducer
export default (state = [], action) => {
  switch (action.type) {
    case UPDATE_CART:
      return state.map((item) =>
        item.id === action.item.id ? action.item : item
      );
    default:
      return state;
  }
};
