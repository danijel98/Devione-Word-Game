package com.spring.devione.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScoreResponse {
	
	private Long id;
	private String word;
	private int points;
	private String user;
	
	public ScoreResponse() {

	}
	
}
