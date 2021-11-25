package com.ssafy.ssafit.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.MainUser;

public interface MainuserRepository extends JpaRepository<MainUser, Long>{
	
	Optional<MainUser> findByUserId(String userid);
}
