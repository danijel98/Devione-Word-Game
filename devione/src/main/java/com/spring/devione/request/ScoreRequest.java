package com.spring.devione.request;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScoreRequest {

	private String word;
	
	public boolean isValidWord(String apiUrl) {		
		System.out.println(apiUrl);

		RestTemplate restTemplate = new RestTemplate();

		try {
			ResponseEntity<String> response = restTemplate.getForEntity(apiUrl, String.class);

			if (response.getStatusCode().is2xxSuccessful()) {
				return true;
			} else {
				return false;
			}
		} catch (HttpClientErrorException e) {
			return false;
		}
	}
}
