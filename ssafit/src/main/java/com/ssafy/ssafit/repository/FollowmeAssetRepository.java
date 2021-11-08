package com.ssafy.ssafit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.FollowmeAsset;
import com.ssafy.ssafit.domain.FollowmeModel;

public interface FollowmeAssetRepository extends JpaRepository<FollowmeAsset, Long>  {
	
	List<FollowmeAsset> findByFollowmeModel(FollowmeModel fm);
}
