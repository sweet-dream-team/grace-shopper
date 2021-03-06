import React from "react";
import {history} from 'react-router-dom'
import { connect } from "react-redux";
import { authenticate } from "../store";

/**
 * COMPONENT
 */

const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error, history} = props;
  console.log('history: ', history)
  console.log('props: ', props)
  return (
    <div className='wholething'>
      <form  onSubmit={handleSubmit} name={name}>
        <div>
        <div className='displayMessage'>
        {displayName === 'Login' ? 
        (<h3>Welcome back! Put your info in below to get dreamin'! </h3>) :
        (<h3>Become a dreammate!! Input your info below & sign on up!</h3>)}
        </div>
          <label htmlFor="email">
            <small>Email Address</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div><br/>
          <button className='authbutton' type="submit">{displayName}</button>
        </div>
        
        {error && error.response && <div> {error.response.data} </div>}
       
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch, props) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(email, password, formName, props.history));
      
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
