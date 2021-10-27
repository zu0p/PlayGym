package com.ssafy.ssafit.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ssafy.ssafit.domain.GetCt;
import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.domain.SubUser;
import com.ssafy.ssafit.repository.GetCtRepository;
import com.ssafy.ssafit.repository.SubUserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SubUserServiceImpl implements SubUserService {

	private final SubUserRepository subUserRepository;
	private final GetCtRepository getCtRepository;
	
	// 서브 계정 추가
	@Override
	public void addSubUser(SubUser subUser) {
		try {
			subUserRepository.save(subUser);
		} catch (Exception e) {
			throw e;
		}
	}
	
	// 서브 계정(자녀) 계정 목록 조회
	@Override
	public List<SubUser> getMySubUserList(MainUser mainuser) {
		List<SubUser> result;
		try {
			result = subUserRepository.findByMainUser(mainuser).orElse(null);
		} catch (Exception e) {
			throw e;
		}	
		return result;
	}

	// 서브 유저 정보 조회
	@Override
	public Map<String, Object> getSubUserInfo(long sid) {
		Map<String, Object> obj = null;
		try {
			Optional<SubUser> s = subUserRepository.findBySid(sid);
			if(s != null) {
				obj = new HashMap<String, Object>();
				SubUser subUser = s.get();
				obj.put("sid", subUser.getSid());
				obj.put("age", subUser.getAge());
				obj.put("tall", subUser.getTall());
				obj.put("weight", subUser.getWeight());
				obj.put("nickName", subUser.getNickName());
				obj.put("mainuser", subUser.getMainUser());
			}	
		} catch (Exception e) {
			throw e;
		}
		return obj;
	}

	// 자녀 계정 정보 수정
	@Override
	public void modifySubUser(SubUser subUser) {
		try {
			Optional<SubUser> s = subUserRepository.findBySid(subUser.getSid());
			s.ifPresent(updatedSub ->{
				updatedSub.setNickName(subUser.getNickName());
				updatedSub.setAge(subUser.getAge());
				updatedSub.setTall(subUser.getTall());
				updatedSub.setWeight(subUser.getWeight());
				subUserRepository.save(updatedSub);
			});
		} catch (Exception e) {
			throw e;
		}
	}
	
	@Override
	public void deleteSub(long sid) {
		SubUser su = subUserRepository.findById(sid).orElse(null);
		GetCt gc = su.getCid();
		su.setCid(null);
		getCtRepository.delete(gc);
		subUserRepository.deleteById(su.getSid());

	}
}
