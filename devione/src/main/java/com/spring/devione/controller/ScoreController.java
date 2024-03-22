package com.spring.devione.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.devione.entity.Score;
import com.spring.devione.entity.User;
import com.spring.devione.request.ScoreRequest;
import com.spring.devione.service.AuthService;
import com.spring.devione.service.ScoreService;
import com.spring.devione.utils.PaginationUtils;
import com.spring.devione.utils.Variables;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping(value = "api/score", produces = MediaType.APPLICATION_JSON_VALUE)
public class ScoreController {

	@Autowired
	private ScoreService scoreService;

	@Autowired
	private AuthService authService;
	
	@Value("${api.url}")
	private String apiUrl;

	
	@GetMapping
	public ResponseEntity<?> getScores(String searchParam, Pageable pageable) {
		Optional<User> user = authService.findByUserId(Variables.getLoggedInUserID());
		if (user.isPresent() && user.get().isActive()) {
			Page<Score> scores = scoreService.filter(user.get().getId(),searchParam, pageable);
			HttpHeaders headers = PaginationUtils.generatePaginationHttpHeaders(scores);
			
			return ResponseEntity.ok().headers(headers).body(scoreService.toDTO(scores.toList()));
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad request.");
	
	}

	@PostMapping("/check-word")
	public ResponseEntity<String> checkWord(@RequestBody ScoreRequest scoreRequest) {
		String word = scoreRequest.getWord();
		String api = this.apiUrl + word;
		boolean isValidWord = scoreRequest.isValidWord(api);

		if (!isValidWord) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid word.");
		}

		int uniqueLettersCount = countUniqueLetters(word);

		boolean isPalindrome = isPalindrome(word);

		boolean isAlmostPalindrome = false;
		
		if (!isPalindrome) {
		    isAlmostPalindrome = isAlmostPalindrome(word);
		}
		
		Optional<User> user = authService.findByUserId(Variables.getLoggedInUserID());
		if (user.isPresent() && user.get().isActive()) {
			scoreService.saveResult(word.toUpperCase(), uniqueLettersCount, isPalindrome, isAlmostPalindrome, user.get());
			
		}

		String response = "palindrome: " + isPalindrome + ", almostPalindrome: " + isAlmostPalindrome + ", word: "+ word + ", uniqueLetters: " + uniqueLettersCount;
		return ResponseEntity.ok(response);
	}

	private int countUniqueLetters(String word) {
		Set<Character> uniqueLetters = new HashSet<>();
		for (char c : word.toCharArray()) {
			uniqueLetters.add(c);
		}
		return uniqueLetters.size();
	}

	private boolean isPalindrome(String word) {
		int length = word.length();
		for (int i = 0; i < length / 2; i++) {
			if (word.charAt(i) != word.charAt(length - 1 - i)) {
				return false;
			}
		}
		return true;
	}

	private boolean isAlmostPalindrome(String word) {
		int i = 0;
		int j = word.length() - 1;

		while (i < j) {
			if (word.charAt(i) != word.charAt(j)) {
				return isPalindrome(word.substring(i + 1, j + 1)) || isPalindrome(word.substring(i, j));
			}
			i++;
			j--;
		}
		return true;
	}

}
