package com.dev.sinha.moviesapi.services;

import com.dev.sinha.moviesapi.repositories.MovieRepository;
import com.dev.sinha.moviesapi.models.Movie;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> allMovies() {
        return movieRepository.findAll();
    }

    public Optional<Movie> singleMovie(ObjectId id) {
        return movieRepository.findById(id);
    }

    public Optional<Movie> singleMovieWithImdbId(String id) {
        System.out.println(id);
        return movieRepository.findMovieByImdbId(id);
    }
}
