package com.spring.devione.security.jwt;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.devione.utils.Errors;


@Component
public class AuthEntryPointToken implements AuthenticationEntryPoint {

	private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointToken.class);

	/**
	 * Always returns a 401 error code to the client.
	 */
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		
		logger.error("Unauthorized error: {}", authException.getMessage());
		
		ObjectMapper objectMapper = new ObjectMapper();
		String json = objectMapper.writeValueAsString(Errors.NewHttpError(Errors.Unauthorized, HttpStatus.UNAUTHORIZED.value()));
		response.setStatus(401);
	
		response.setContentType("application/json");
	    response.getWriter().write(json);
	}
	
}
