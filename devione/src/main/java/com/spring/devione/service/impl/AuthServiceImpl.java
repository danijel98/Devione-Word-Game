package com.spring.devione.service.impl;

import java.util.Optional;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.spring.devione.entity.User;
import com.spring.devione.repository.UserRepository;
import com.spring.devione.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

	private static final Log log = LogFactory.getLog(AuthServiceImpl.class);

	@Autowired
	private UserRepository userRepository;

	@Override
	public User findByUserName(String userName) {
		Optional<User> user = userRepository.findByUserName(userName);
		if (user.isPresent()) {
			if (user.get().isActive()) {
				return user.get();
			} else {
				log.debug(String.format("User not active '{}'", userName));
				throw new UsernameNotFoundException(userName);
			}
		} else {
			log.debug(String.format("Username not found '{}'", userName));
			throw new UsernameNotFoundException(userName);
		}
	}

	@Override
	public User saveUser(User user) {
		User u = userRepository.save(user);
		
		return u;
	}

	@Override
	public boolean existsByEmail(String email) {
		Optional<User> user = userRepository.findByEmail(email);
		boolean isPresent = user.isPresent();
		return isPresent;
	}

	@Override
	public boolean existsByUsername(String username) {
		Optional<User> user = userRepository.findByUserName(username);
		boolean isPresent = user.isPresent();
		return isPresent;
	}

	@Override
	public Optional<User> findByUserId(Long loggedInUserID) {
		return userRepository.findById(loggedInUserID);
	}

	
}
