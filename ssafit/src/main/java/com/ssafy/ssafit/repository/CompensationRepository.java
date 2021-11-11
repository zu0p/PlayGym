package com.ssafy.ssafit.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.Compensation;
import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.dto.CompensationMapping;

public interface CompensationRepository extends JpaRepository<Compensation, Long>{

	Optional<List<Compensation>> findByPid(MainUser pid);
	Optional<List<Compensation>> findByBasic(boolean b);
}
