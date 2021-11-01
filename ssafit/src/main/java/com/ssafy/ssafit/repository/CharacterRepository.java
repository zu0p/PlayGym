package com.ssafy.ssafit.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.Characters;

public interface CharacterRepository extends JpaRepository<Characters, Long> {
	
}
