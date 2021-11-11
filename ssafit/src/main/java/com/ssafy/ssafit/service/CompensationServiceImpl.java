package com.ssafy.ssafit.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.ssafit.domain.Compensation;
import com.ssafy.ssafit.domain.GetCps;
import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.domain.RequestStatus;
import com.ssafy.ssafit.domain.SubUser;
import com.ssafy.ssafit.dto.CompensationMapping;
import com.ssafy.ssafit.repository.CompensationRepository;
import com.ssafy.ssafit.repository.GetCpsRepository;
import com.ssafy.ssafit.repository.MainuserRepository;
import com.ssafy.ssafit.repository.SubUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CompensationServiceImpl implements CompensationService {
	
	private final MainuserRepository mainuserRepository;
	private final CompensationRepository compensationRepository;
	private final GetCpsRepository getCpsRepository;
	private final SubUserRepository subUserRepository;
	

	@Override
	public List<Compensation> findPidCps(long id) {
		MainUser m =mainuserRepository.findById(id).orElse(null);
		List<Compensation> res = compensationRepository.findByPid(m).orElse(null);
		res.addAll(compensationRepository.findByBasic(true).orElse(null));
		return res;
	}
	
	@Override
	@Transactional
	public void saveCompensation(Map<String, Object> map) {
		// TODO Auto-generated method stub
		
		Compensation c = new Compensation();
		c.setTitle((String)map.get("title"));
		c.setDetail((String)map.get("detail"));
		c.setBasic(false);
		MainUser m =mainuserRepository.findById(Long.parseLong(String.valueOf(map.get("pid")))).orElse(null);
		c.setPid(m);
		
		if(!map.containsKey("child")) {
			throw new NullPointerException();
		}
		
		long su = Long.parseLong(String.valueOf(map.get("child")));
		SubUser sub = subUserRepository.findById(su).orElse(null);	
		if(sub!=null) {
			compensationRepository.save(c);
			getCpsRepository.save(new GetCps(sub, c));
		}else {
			throw new NullPointerException();
		}	
		
	}
	@Override
	@Transactional
	public void deleteCps(long id) {
		
		Compensation c = compensationRepository.findById(id).get();
		
		if(c!=null && !c.isBasic()) {
			compensationRepository.deleteById(id);
		}
		

	}

	@Override
	public List<GetCps> subUserlist(long sid) {
		SubUser su = subUserRepository.getById(sid);
		List<GetCps> cps = getCpsRepository.findBySubid(su).orElse(null);
		
		return cps;
	}

	@Override
	@Transactional
	public void subUserReqCps(GetCps gc) {
		// TODO Auto-generated method stub
		
		if(gc==null) {
			throw new NullPointerException();
		}
		SubUser su = gc.getSubid();
		if(su.getExp()<su.getMax()) {
			throw new IllegalStateException();
		}
		su.setExp(su.getExp()-su.getMax());
		su.setMax(su.getMax()+50);
		
		su.setLevel(su.getLevel()+1);
		gc.changeStatus(RequestStatus.Request);
	}
	
	
	

}
