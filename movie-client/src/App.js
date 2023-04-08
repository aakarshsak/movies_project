import React, { useState, useEffect } from "react";
import api from "./api/axiosConfig";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

const App = () => {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();
  const [token, setToken] = useState();
  const [isAuth, setIsAuth] = useState(false);

  const getAllMovies = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await api.get("/api/v1/movies", headers);
      setMovies(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const getMovie = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/imdb/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviewIds);
      console.log(singleMovie);
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (username, password) => {
    try {
      const request = { username, password };
      const response = await api.post(`/api/v1/auth/login`, request);

      const token = response.data.token;
      setToken(token);
      console.log(token);
      setIsAuth(true);
    } catch (err) {
      console.log(e);
    }
  };

  const register = async (username, password, firstname, lastname, email) => {
    try {
      const request = { username, password, firstname, lastname, email };
      const response = await api.post(`/api/v1/auth/register`, request);

      const token = response.data.token;
      setToken(token);
      console.log(token);
      setIsAuth(true);
    } catch (err) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div className="App">
      <Header />
      {isAuth ? (
        !loading && (
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home movies={movies} />}></Route>
              <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
              <Route
                path="/Reviews/:movieId"
                element={
                  <Reviews
                    getMovieData={getMovie}
                    movie={movie}
                    reviews={reviews}
                    setReviews={setReviews}
                  />
                }
              />
              <Route path="/Login" element={<Login login={login} />} />
              <Route
                path="/Register"
                element={<Register register={register} />}
              />
            </Route>
          </Routes>
        )
      ) : (
        <Login login={login} />
      )}
    </div>
  );
};

export default App;
