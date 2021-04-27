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
    console.log("is the component mounting")
    this.props.getUsers();
  }
  

  render() {
      console.log("state: ", this.state)
      console.log('this.props:', this.props)
    const users = this.props.users;
    return (
      <div>
        { !this.props.users.length ? 
        (<h2> L O A D I N G... </h2>) :
      (<div>
        <h1>Users</h1>
        <div>
          {users.map((user) => (
            <div key={user.id}>
            <h1>{user.email}</h1>
            </div>
          ))}
        </div>
      </div>
    )
        }
        </div>
    )
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
