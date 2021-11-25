package com.ssafy.ssafit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.MugunghwaModel;

public interface MugunghwaModelRepository extends JpaRepository<MugunghwaModel, Long> {
	
	MugunghwaModel findByLevel(int level);
}
