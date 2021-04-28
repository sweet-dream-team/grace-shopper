import React from "react";
import { Link } from "react-router-dom";

const AuthFormAtCheckout = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div>
      <div className="customer-form">
        <form>
          <input placeholder="email" />
          <input placeholder="password" />
          <button>
            <Link to="/checkout">Checkout as Returning Customer</Link>
          </button>
        </form>
      </div>
      <div className="guest-form">
        <form>
          <input placeholder="email" />
          <button>
            <Link to="/checkout">Checkout as Guest</Link>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthFormAtCheckout;
