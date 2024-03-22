package com.spring.devione.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.devione.entity.Score;
import com.spring.devione.entity.User;

public interface ScoreRepository extends JpaRepository<Score, Long>  {
	
    boolean existsByUserAndWord(User user, String word);
	Page<Score> findByUserIdAndWordContainingIgnoreCase(Long id, String searchParam, Pageable pageable);

}
