package com.spring.devione.service;

import java.util.Collection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.spring.devione.entity.Score;
import com.spring.devione.entity.User;
import com.spring.devione.response.ScoreResponse;

public interface ScoreService {
	
    void saveResult(String word, int uniqueLettersCount, boolean isPalindrome, boolean isAlmostPalindrome, User user);
    
	Page<Score> filter(Long id, String searchParam, Pageable pageable);
	
	Collection<ScoreResponse> toDTO(Collection<Score> models);

	boolean existsByUserAndWord(User user, String word);


}
