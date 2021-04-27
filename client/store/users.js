import axios from 'axios'

/** Action Constants */

const SET_USERS = "SET_USERS"


/** Action Types */

export const _setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

/** Thunks */

export const setUsersThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/users");
      dispatch(_setUsers(data));
    } catch (err) {
      console.log("Error fetching all users via thunk");
    }
  };
};

/** Users Reducer */

export default (state = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
};