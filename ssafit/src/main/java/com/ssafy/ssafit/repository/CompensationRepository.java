package com.ssafy.ssafit.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.Compensation;

public interface CompensationRepository extends JpaRepository<Compensation, Long>{

//	Optional<List<Compensation>> findbyPid(long pid);
}
