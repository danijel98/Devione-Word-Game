package com.spring.devione.security.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.spring.devione.entity.User;
import com.spring.devione.service.AuthService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	private final AuthService authService;
	
	@Autowired
	public UserDetailsServiceImpl(AuthService authService) {
		this.authService = authService;
	}
	
	@Override
	public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
		User user = authService.findByUserName(userName);
		
		return UserDetailsImpl.build(user);
	}

}
