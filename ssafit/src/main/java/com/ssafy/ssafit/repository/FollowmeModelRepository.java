package com.ssafy.ssafit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.FollowmeModel;

public interface FollowmeModelRepository extends JpaRepository<FollowmeModel, Long> {
	
	FollowmeModel findByLevel(int level);
}
