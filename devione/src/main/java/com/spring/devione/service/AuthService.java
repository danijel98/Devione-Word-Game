package com.spring.devione.service;

import java.util.Optional;

import com.spring.devione.entity.User;

public interface AuthService {

	User findByUserName(String userName);

	User saveUser(User user);

	boolean existsByEmail(String email);

	boolean existsByUsername(String username);

	Optional<User> findByUserId(Long loggedInUserID);

}
