/* eslint-disable prefer-destructuring */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable no-unused-expressions */
import React from "react";
import { connect } from "react-redux";
import { setUsersThunk } from "../store/users";

export class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }
  

  render() {
      console.log('this.props.users:', this.props.users)
    const users = this.props.users;
    return (

      <div>
        <h1>Users</h1>
        <div>
          {users.map((user) => (
            <div key={user.id}>
            <h1>{user.email}</h1>
            <p>Password: {user.password}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => dispatch(setUsersThunk()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);
