package com.dev.sinha.moviesapi.repositories;

import com.dev.sinha.moviesapi.models.Token;
import com.dev.sinha.moviesapi.models.User;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends MongoRepository<Token, ObjectId> {
    Optional<Token> findByToken(String token);

    List<Token> findTokenByUser(User user);

    List<Token> deleteTokenByUser(User user);
}
