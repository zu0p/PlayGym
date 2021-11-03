package com.ssafy.ssafit.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Long>{

	Optional<List<Exercise>> findByStep(int step);

	
}
