package com.ssafy.ssafit.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.domain.SubUser;

public interface SubUserRepository extends JpaRepository<SubUser, Long>{

	Optional<List<SubUser>> findByMainUser(MainUser m);
	Optional<SubUser> findBySid(long sid);
	void deleteBySid(long sid);
}
