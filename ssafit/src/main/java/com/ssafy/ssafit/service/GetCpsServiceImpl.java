package com.ssafy.ssafit.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.ssafit.domain.Compensation;
import com.ssafy.ssafit.domain.GetCps;
import com.ssafy.ssafit.domain.SubUser;
import com.ssafy.ssafit.repository.CompensationRepository;
import com.ssafy.ssafit.repository.GetCpsRepository;
import com.ssafy.ssafit.repository.SubUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GetCpsServiceImpl implements GetCpsService {

	private final GetCpsRepository getCpsRepository;
	private final SubUserRepository subUserRepository;
	private final CompensationRepository compensationRepository;
	@Override
	@Transactional
	public void insertGetCps(List<Object> list, long cid) {
		Compensation c = compensationRepository.getById(cid);
		for(int i=0;i<list.size();i++) {
			SubUser su = subUserRepository.findById(Long.valueOf(String.valueOf(list.get(i)))).orElse(null);
			if(su!=null) {
				getCpsRepository.save(new GetCps(su, c));
			}
		}
	}
	
	@Override
	@Transactional
	public void deleteGetCps(long id) {
		// TODO Auto-generated method stub
		GetCps gc = getCpsRepository.findById(id).orElse(null);
		getCpsRepository.delete(gc);
		
	}
}
