package com.spring.devione.request;

import com.spring.devione.utils.Errors;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {

	private String username;
	private String password;

	
	public String Validate() {

  	  	String msg="";
		
		// validating username field with required, min length 2, max length 20 and regex check
		msg = Errors.ValidateRequireAndLengthAndRegex(this.username, true, 2, 20, "", "Username");
		if(!msg.isEmpty()) {
			return msg;
		}
		
		// validating password field with required, min length 8, max length 32 and regex check
		msg = Errors.ValidateRequireAndLengthAndRegex(this.password, true, 8, 32, "", "Password");
		if(!msg.isEmpty()) {
			return msg;
		}
		
		return msg;

  	}
}
