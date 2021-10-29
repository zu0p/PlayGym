package com.ssafy.ssafit.service;

import java.util.List;
import java.util.Map;

import com.ssafy.ssafit.domain.Compensation;
import com.ssafy.ssafit.dto.CompensationMapping;

public interface CompensationService {

	public List<CompensationMapping> findPidCps(long id);
	public void saveCompensation(Map<String,Object> map);
	public void deleteCps(long id);
	
}
