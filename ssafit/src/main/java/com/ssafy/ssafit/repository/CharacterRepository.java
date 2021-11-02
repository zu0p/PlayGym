package com.ssafy.ssafit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.Characters;

import java.util.Optional;

public interface CharacterRepository extends JpaRepository<Characters, Long> {
	
}
