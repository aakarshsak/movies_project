package com.dev.sinha.moviesapi.controllers;

import com.dev.sinha.moviesapi.services.MovieService;
import com.dev.sinha.moviesapi.models.Movie;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        return new ResponseEntity(movieService.allMovies(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Movie>> getMovie(@PathVariable ObjectId id) {
        return new ResponseEntity(movieService.singleMovie(id), HttpStatus.OK);
    }

    @GetMapping("/imdb/{id}")
    public ResponseEntity<Optional<Movie>> getMovie(@PathVariable String id) {
        return new ResponseEntity(movieService.singleMovieWithImdbId(id), HttpStatus.OK);
    }

}
