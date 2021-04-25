import React from "react";
import { connect } from "react-redux";

export const Home = (props) => {
  //const { email } = props;

  return (
    <div className="home">
      <h3>Dreamporium Test</h3>
      <p>
        Your dreams <i>await</i> you
      </p>
    </div>
  );
};

// const mapState = (state) => {
//   return {
//     email: state.auth.email,
//   };
// };

// export default connect(mapState)(Home);

export default Home;
