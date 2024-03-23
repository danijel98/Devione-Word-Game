package com.spring.devione.request;

import com.spring.devione.utils.Errors;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpRequest {
	
	private String name;
	private String lastname;
    private String email;
    private String username;
    private String password;
    
    public String Validate() {

  	  	String msg="";
  		// validating name field with required, min length 2, max length 30 and regex check
  	  	msg= Errors.ValidateRequireAndLengthAndRegex(this.name, true, 2, 30, "^(?!.*[ ]{2})[A-ZČĆĐŠŽ]+(?:[a-zA-ZČčĆćŠšĐđŽž ]+)*[a-zčćšđž]$", "Ime");
  		if(!msg.isEmpty()) {
  			return msg;
  		}

  		// validating lastname field with required, min length 2, max length 40 and regex check
  		msg =  Errors.ValidateRequireAndLengthAndRegex(this.lastname, true, 2, 40, "^(?!.*[ ]{2})[A-ZČĆĐŠŽ]+(?:[a-zA-ZČčĆćŠšĐđŽž -]+)*[a-zčćšđž]$", "Prezime");
  		if(!msg.isEmpty()) {
  			return msg;
  		}

  		// validating email field with required, min length 5, max length 60 and regex check
  		msg = Errors.ValidateRequireAndLengthAndRegex(this.email, true, 5, 60, "^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", "Email");
  		if(!msg.isEmpty()) {
  			return msg;
  		}
  		
  		// validating username field with required, min length 2, max length 20 and regex check
  		msg = Errors.ValidateRequireAndLengthAndRegex(this.username, true, 2, 20, "^(?!.*[ ]{2})[a-z0-9]+(?:[a-z0-9_.]+)*[a-z0-9]$", "Username");
  		if(!msg.isEmpty()) {
  			return msg;
  		}

  		// validating password field with required, min length 8, max length 32 and regex check
  		msg = Errors.ValidateRequireAndLengthAndRegex(this.password, true, 8, 32, "^.*((?=.*[!@#$%^&*()\\-_=+{};:,<.>]){0})((?=.*[0-9]{1}))((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$", "Password");
  		if(!msg.isEmpty()) {
  			return msg;
  		}
  		
  		return msg;
  		
  	}

}
