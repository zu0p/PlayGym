package com.ssafy.ssafit.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.ssafy.ssafit.domain.GetCt;
import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.domain.SubUser;
import com.ssafy.ssafit.repository.GetCtRepository;
import com.ssafy.ssafit.repository.MainuserRepository;
import com.ssafy.ssafit.repository.SubuserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MainUserServiceImpl implements MainUserService{

	private final MainuserRepository mainuserRepository;
	private final SubuserRepository subuserRepository;
	private final GetCtRepository getCtRepository;
	@Override
	public void deleteMember(long id) {
		MainUser m = mainuserRepository.findById(id).orElse(null);
		List<SubUser> sub = subuserRepository.findBymainUser(m).orElse(null);
		for(SubUser sb : sub) {
			GetCt gc = sb.getCid();
			sb.setCid(null);
			getCtRepository.delete(gc);
			subuserRepository.deleteById(sb.getSid());
		}
		mainuserRepository.deleteById(id);
	}

}
