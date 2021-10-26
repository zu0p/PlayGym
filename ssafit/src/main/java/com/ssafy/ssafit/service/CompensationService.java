package com.ssafy.ssafit.service;

import java.util.List;

import com.ssafy.ssafit.domain.Compensation;

public interface CompensationService {

	public List<Compensation> findPidCompensation(long id);
	
}
