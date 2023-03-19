import React, { useState, useEffect } from "react";
import api from "./api/axiosConfig";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Hero from "./components/hero/Hero";

const App = () => {
  const [movies, setMovies] = useState();

  const getAllMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      console.log(response.data);
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Hero />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
