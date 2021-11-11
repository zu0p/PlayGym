package com.ssafy.ssafit.service;

import java.util.List;
import java.util.Map;

import com.ssafy.ssafit.domain.Compensation;
import com.ssafy.ssafit.domain.GetCps;
import com.ssafy.ssafit.dto.CompensationMapping;

public interface CompensationService {

	public List<Compensation> findPidCps(long id);
	public void saveCompensation(Map<String,Object> map);
	public void deleteCps(long id);
	
	public List<GetCps> subUserlist(long sid);
	
	public void subUserReqCps(GetCps gc);
	
}
