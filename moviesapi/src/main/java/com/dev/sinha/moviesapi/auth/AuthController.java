package com.dev.sinha.moviesapi.auth;

import com.dev.sinha.moviesapi.models.User;
import com.dev.sinha.moviesapi.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Optional<AuthResponse>> allUsers(@RequestBody RegisterRequest request){
        return new ResponseEntity(authService.register(request), HttpStatus.OK) ;
    }

    @PostMapping("/login")
    public ResponseEntity<Optional<AuthResponse>> addUser(@RequestBody LoginRequest request) {
        return new ResponseEntity(authService.login(request), HttpStatus.OK);
    }

}