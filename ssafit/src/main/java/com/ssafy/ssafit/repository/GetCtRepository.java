package com.ssafy.ssafit.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.Characters;
import com.ssafy.ssafit.domain.GetCt;
import com.ssafy.ssafit.domain.SubUser;

public interface GetCtRepository extends JpaRepository<GetCt, Long>{

	List<GetCt> findBySid(long sid);
	GetCt findBySidAndCtid(SubUser s, Characters c);

}
