import React, { useState, useEffect } from "react";
import api from "./api/axiosConfig";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";
import "./App.css";

const App = () => {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  const getAllMovies = async () => {
    try {
      const res = await api.get("/api/v1/movies");
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

  useEffect(() => {
    getAllMovies();
  }, []);

  return (
    <div className="App">
      <Header />
      {!loading && (
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
          </Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
