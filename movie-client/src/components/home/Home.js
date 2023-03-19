import React from "react";
import Hero from "../hero/Hero";
import Button from "react-bootstrap/Button";

const Home = ({ movies }) => {
  return (
    <div>
      <Hero movies={movies} />
      {/* <Button variant="outline-info">Login</Button>
      <Button variant="outline-info">Register</Button> */}
    </div>
  );
};

export default Home;
