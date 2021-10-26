package com.ssafy.ssafit.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.domain.SubUser;

public interface SubuserRepository extends JpaRepository<SubUser, Long>{
	
	Optional<SubUser> findByMainUser(MainUser mainuser);
}
