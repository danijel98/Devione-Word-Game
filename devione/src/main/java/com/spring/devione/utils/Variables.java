package com.spring.devione.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.spring.devione.security.services.UserDetailsImpl;

public class Variables {
	
	public static Long getLoggedInUserID(){
		Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		
		return userDetails.getId();
	}

}
