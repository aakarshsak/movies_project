package com.dev.sinha.moviesapi.repositories;

import com.dev.sinha.moviesapi.models.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {

    Optional<User> findUserByUsername(String username);
    Optional<User> findUserByEmail(String email);

}
