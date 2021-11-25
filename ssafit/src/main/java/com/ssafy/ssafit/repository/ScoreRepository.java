package com.ssafy.ssafit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.Score;
import com.ssafy.ssafit.domain.SubUser;

public interface ScoreRepository extends JpaRepository<Score, Long>{

	List<Score> findBySubId(SubUser user);
	

}
