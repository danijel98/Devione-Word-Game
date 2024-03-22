package com.spring.devione.security.jwt;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.spring.devione.security.services.UserDetailsImpl;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class TokenUtils {
	
	private static final Logger logger = LoggerFactory.getLogger(TokenUtils.class);

	@Value("myXAuthSecret")
	private String secret;
	
	
	/**
	 * creates the Jwt Token
	 */
	public String generateJwtToken(Authentication authentication) {
		
		UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();
		try {
		return Jwts.builder()
				.setSubject((userPrincipal.getUsername()))
				.setId(userPrincipal.getId().toString())
				.setIssuedAt(new Date())
				.signWith(SignatureAlgorithm.HS512, this.secret.getBytes("UTF-8"))
				.compact();
		}catch(UnsupportedEncodingException ex) {
			 return Jwts.builder()
					.setSubject((userPrincipal.getUsername()))
					.setId(userPrincipal.getId().toString())
					.setIssuedAt(new Date())
					.signWith(SignatureAlgorithm.HS512, this.secret)
					.compact();
		}
	}

	/**
	 * Gets the username from token
	 */
	public String getUserNameFromJwtToken(String token) {
		try {
			return Jwts.parser().setSigningKey(this.secret.getBytes("UTF-8")).parseClaimsJws(token).getBody().getSubject();	
		}catch (Exception e) {
			return null;
		}
	}

	public boolean validateJwtToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(this.secret.getBytes("UTF-8")).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		} catch (MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		} catch (ExpiredJwtException e) {
			logger.error("JWT token is expired: {}", e.getMessage());
		} catch (UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}", e.getMessage());
		} catch (IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}", e.getMessage());
		} catch (Exception e) {
			return false;
		}

		return false;
	}
}