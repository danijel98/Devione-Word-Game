package com.spring.devione.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.devione.entity.User;
import com.spring.devione.request.LoginRequest;
import com.spring.devione.request.SignUpRequest;
import com.spring.devione.response.MessageResponse;
import com.spring.devione.response.TokenResponse;
import com.spring.devione.security.jwt.TokenUtils;
import com.spring.devione.security.services.UserDetailsImpl;
import com.spring.devione.service.AuthService;
import com.spring.devione.utils.Errors;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {
	
	private final AuthenticationManager authenticationManavger;
	private final TokenUtils tokenUtils;
	private final AuthService authService;
	private final PasswordEncoder passwordEncoder;
	

	@Autowired
	public AuthenticationController(AuthenticationManager authenticationManavger, TokenUtils tokenUtils, AuthService authService, PasswordEncoder passwordEncoder) {
		this.authenticationManavger = authenticationManavger;
		this.tokenUtils = tokenUtils;
		this.authService = authService;
		this.passwordEncoder = passwordEncoder;
	}

	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
		
		String val = loginRequest.Validate();
		if(!val.isEmpty()){
			return ResponseEntity.badRequest().body(Errors.NewHTTPCustomError(Errors.BadRequest, val, HttpStatus.BAD_REQUEST.value()));
		}

		Authentication authentication = authenticationManavger.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String jwt = tokenUtils.generateJwtToken(authentication);
		
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		
		
		return ResponseEntity.ok(new TokenResponse(jwt, 
												 userDetails.getId(), 
												 userDetails.getName(),
												 userDetails.getLastname(),
												 userDetails.getEmail(), 
												 userDetails.getUsername(),
												 userDetails.isActive()
												 ));
	}

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody SignUpRequest signUpRequest) {

		String val = signUpRequest.Validate();
		if(!val.isEmpty()){
			System.out.println("msg: " + val);
			return ResponseEntity.badRequest().body(Errors.NewHTTPCustomError(Errors.BadRequest,val, HttpStatus.BAD_REQUEST.value()));
		}
		
		if (authService.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(Errors.NewHttpError(Errors.EmailAlreadyExists, HttpStatus.NOT_FOUND.value()));
		}
		
		if (authService.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(Errors.NewHttpError(Errors.UsernameAlreadyExists, HttpStatus.NOT_FOUND.value()));
		}
		
		User user = new User(signUpRequest.getName(), signUpRequest.getLastname(), signUpRequest.getEmail(), signUpRequest.getUsername(), passwordEncoder.encode(signUpRequest.getPassword()), true);

		authService.saveUser(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	



}