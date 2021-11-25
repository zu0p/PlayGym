package com.ssafy.ssafit.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.GetCps;
import com.ssafy.ssafit.domain.SubUser;

public interface GetCpsRepository extends JpaRepository<GetCps, Long>{

	Optional<List<GetCps>> findBySubid(SubUser su);

}
