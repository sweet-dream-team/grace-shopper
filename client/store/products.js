/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import axios from "axios";

// action types
const SET_PRODUCTS = "SET_PRODUCTS";

const DELETE_PRODUCT = 'DELETE_PRODUCT'

const CREATE_PRODUCT = 'CREATE_PRODUCT'




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

export const _createProduct = (product) =>{
  return {
    type: CREATE_PRODUCT,
    product
  }
}



// thunks

export const setProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/products",{
      headers: {
        authorization: window.localStorage.getItem('token')
      }
    });
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

export const createDreamThunk = (product) =>{
  return async(dispatch) =>{
    try {
      const token = window.localStorage.getItem('token')
      const { data } = await axios.post('/auth/admin/', product, {
      headers: {
        authorization: token
      }
    });
      dispatch(_createProduct(data));
    } catch (error) {
      console.error(error);
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
    case CREATE_PRODUCT:
        return [...state, action.product]
    default:
      return state;
  }
};
