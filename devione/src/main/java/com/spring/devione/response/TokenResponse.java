package com.spring.devione.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenResponse {
	private UserResponse user;
	private String token;

	public TokenResponse(
			String accessToken, 
			Long id, 
			String name,
			String lastname, 
			String email, 
			String userName,
			boolean active
			) {
		this.token = accessToken;
		this.user = new UserResponse();
		this.user.setId(id);
		this.user.setName(name);
		this.user.setLastname(lastname);
		this.user.setEmail(email);
		this.user.setUserName(userName);
		this.user.setActive(active);
	}


}
