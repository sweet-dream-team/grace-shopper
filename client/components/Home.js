import React from "react";
import { connect } from "react-redux";

export const Home = (props) => {
  //const { email } = props;

  return (
    <div className="home">
      <img src='logo.png' className='homelogo'/>
      <div className='catchphrase'>
      <p> Your dreams  <strong>await</strong> you</p>
      </div>
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
