package com.spring.devione.service.impl;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.spring.devione.entity.Score;
import com.spring.devione.entity.User;
import com.spring.devione.repository.ScoreRepository;
import com.spring.devione.response.ScoreResponse;
import com.spring.devione.service.ScoreService;

@Service
public class ScoreServiceImpl implements ScoreService {

	@Autowired
	private ScoreRepository scoreRepository;

	@Override
	public void saveResult(String word, int uniqueLettersCount, boolean isPalindrome, boolean isAlmostPalindrome,
			User user) {

		if (scoreRepository.existsByUserAndWord(user, word)) {
		    throw new RuntimeException("Word already exists");
		}

		int points = calculatePoints(uniqueLettersCount, isPalindrome, isAlmostPalindrome);

		Score score = new Score();
		score.setWord(word);
		score.setPoints(points);
		score.setUser(user);

		scoreRepository.save(score);
	}

	private int calculatePoints(int uniqueLettersCount, boolean isPalindrome, boolean isAlmostPalindrome) {
		int points = uniqueLettersCount;

		if (isPalindrome) {
			points += 3; 
		} else if (isAlmostPalindrome) {
			points += 2; 
		}

		return points;
	}

	@Override
	public Page<Score> filter(Long id, String searchParam, Pageable pageable) {
		Sort sort = Sort.by(Sort.Direction.DESC, "points");
		pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
		Page<Score> scores = scoreRepository.findByUserIdAndWordContainingIgnoreCase(id, searchParam, pageable);
		
		return scores;
	}

	@Override
	public Collection<ScoreResponse> toDTO(Collection<Score> models) {
		return models.stream().map(this::convertToResponseScore).collect(Collectors.toList());

	}

	public ScoreResponse convertToResponseScore(Score score) {
		ScoreResponse scoreResponse = new ScoreResponse();
		scoreResponse.setId(score.getId());
		scoreResponse.setWord(score.getWord());
		scoreResponse.setPoints(score.getPoints());
		scoreResponse.setUser(score.getUser().getUserName());

		return scoreResponse;
	}

}