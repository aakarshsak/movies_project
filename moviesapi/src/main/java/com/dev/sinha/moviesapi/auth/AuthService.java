package com.dev.sinha.moviesapi.auth;

import com.dev.sinha.moviesapi.models.Role;
import com.dev.sinha.moviesapi.models.Token;
import com.dev.sinha.moviesapi.models.TokenType;
import com.dev.sinha.moviesapi.models.User;
import com.dev.sinha.moviesapi.repositories.TokenRepository;
import com.dev.sinha.moviesapi.repositories.UserRepository;
import com.dev.sinha.moviesapi.services.JwtService;
import com.dev.sinha.moviesapi.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserService userService;
    private final AuthenticationManager authManager;
    private final TokenRepository tokenRepository;

    public AuthResponse register(RegisterRequest payload) {
        User user = User.builder()
                .firstName(payload.getFirstName())
                .lastName(payload.getLastName())
                .password(passwordEncoder.encode(payload.getPassword()))
                .email(payload.getEmail())
                .username(payload.getUsername())
                .role(Role.USER)
                .build();
        User userSaved = userService.adduser(user);
        var token = jwtService.generateToken(user);
        saveUserToken(userSaved, token);

        return AuthResponse.builder().token(token).build();
    }

    public void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.insert(token);
    }

    public AuthResponse login(LoginRequest payload) {

        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        payload.getUsername(),
                        payload.getPassword()
                )
        );

        UserDetails userDetails = userService.loadUserByUsername(payload.getUsername());

        String token = jwtService.generateToken((User)userDetails);
        saveUserToken((User)userDetails, token);

        return AuthResponse.builder().token(token).build();
    }
}
