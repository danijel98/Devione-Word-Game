package com.spring.devione.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {

	private Long id;
	private String name;
	private String lastname;
	private String email;
	private String userName;
	private boolean active = true;
	
	public UserResponse() {
		
	}
	
}
