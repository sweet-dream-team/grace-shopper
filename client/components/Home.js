import React from "react";
import { connect } from "react-redux";

export const Home = (props) => {
  //const { username } = props;

  return (
    <div className="home">
      <h3>Name of Store</h3>
    </div>
  );
};

// const mapState = (state) => {
//   return {
//     username: state.auth.username,
//   };
// };

// export default connect(mapState)(Home);

export default Home;
