package com.ssafy.ssafit.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.ssafy.ssafit.domain.Compensation;
import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.dto.CompensationMapping;
import com.ssafy.ssafit.repository.CompensationRepository;
import com.ssafy.ssafit.repository.MainuserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompensationServiceImpl implements CompensationService {
	
	private final MainuserRepository mainuserRepository;
	private final CompensationRepository compensationRepository;
	@Override
	public List<CompensationMapping> findPidCps(long id) {
		MainUser m =mainuserRepository.findById(id).orElse(null);
		return compensationRepository.findByPid(m).orElse(null);
	}
	@Override
	public void saveCompensation(Map<String, Object> map) {
		// TODO Auto-generated method stub
		Compensation c = new Compensation();
		c.setExp(Integer.parseInt(String.valueOf(map.get("exp"))));
		c.setTitle((String)map.get("title"));
		c.setDetail((String)map.get("detail"));
		c.setBasic((boolean)map.get("basic"));
		MainUser m =mainuserRepository.findById(Long.parseLong(String.valueOf(map.get("pid")))).orElse(null);
		c.setPid(m);
		compensationRepository.save(c);
	}

}
