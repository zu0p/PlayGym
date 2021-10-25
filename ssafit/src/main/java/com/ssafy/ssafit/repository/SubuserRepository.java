package com.ssafy.ssafit.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.MainUser;

public interface SubuserRepository extends JpaRepository<MainUser, Long>{
	
}
