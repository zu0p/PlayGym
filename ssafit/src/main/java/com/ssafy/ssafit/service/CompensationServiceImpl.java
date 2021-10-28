package com.ssafy.ssafit.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.ssafit.domain.Compensation;
import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.dto.CompensationMapping;
import com.ssafy.ssafit.repository.CompensationRepository;
import com.ssafy.ssafit.repository.MainuserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CompensationServiceImpl implements CompensationService {
	
	private final MainuserRepository mainuserRepository;
	private final CompensationRepository compensationRepository;
	
	@Override
	public List<CompensationMapping> findPidCps(long id) {
		MainUser m =mainuserRepository.findById(id).orElse(null);
		List<CompensationMapping> res = compensationRepository.findByPid(m).orElse(null);
		res.addAll(compensationRepository.findByBasic(true).orElse(null));
		return res;
	}
	
	@Override
	@Transactional
	public void saveCompensation(Map<String, Object> map) {
		// TODO Auto-generated method stub
		Compensation c = new Compensation();
		c.setExp(Integer.parseInt(String.valueOf(map.get("exp"))));
		c.setTitle((String)map.get("title"));
		c.setDetail((String)map.get("detail"));
		c.setBasic(false);
		MainUser m =mainuserRepository.findById(Long.parseLong(String.valueOf(map.get("pid")))).orElse(null);
		c.setPid(m);
		compensationRepository.save(c);
	}
	@Override
	@Transactional
	public void deleteCps(long id) {
		
		Compensation c = compensationRepository.findById(id).get();
		if(c!=null && !c.isBasic()) {
			compensationRepository.deleteById(id);
		}
		

	}
	
	
	

}
