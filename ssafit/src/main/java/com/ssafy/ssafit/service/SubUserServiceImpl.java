package com.ssafy.ssafit.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.ConstraintViolationException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.ssafit.domain.ApiResMessage;
import com.ssafy.ssafit.domain.GetCt;
import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.domain.SubUser;
import com.ssafy.ssafit.repository.GetCtRepository;
import com.ssafy.ssafit.repository.MainuserRepository;
import com.ssafy.ssafit.repository.SubUserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class SubUserServiceImpl implements SubUserService {

	private final SubUserRepository subUserRepository;
	private final GetCtRepository getCtRepository;
	private final MainuserRepository mainuserRepository;
	
	// 서브 계정 추가
	@Override
	public void addSubUser(Map<String, String> subUser) {
		try {
			subUserRepository.save((SubUser.builder()
					.nickName(subUser.get("nickName"))
					.age(Integer.parseInt(subUser.get("age")))
					.weight(Integer.parseInt(subUser.get("weight")))
					.tall(Integer.parseInt(subUser.get("tall")))
					.mainUser(mainuserRepository.findByUserId(subUser.get("id")).get())
					.build()
					));
		} catch(ConstraintViolationException e) {
			throw e;
		}
		catch (DataIntegrityViolationException e) {
			throw e;
		}
		catch (Exception e) {
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
	public void modifySubUser(Map<String, String> subUser) {
		try {
			Optional<SubUser> s = subUserRepository.findBySid(Long.parseLong(subUser.get("sid")));
			s.ifPresent(updatedSub -> {
				updatedSub.setNickName(subUser.get("nickName"));
				updatedSub.setAge(Integer.parseInt(subUser.get("age")));
				updatedSub.setTall(Integer.parseInt(subUser.get("tall")));
				updatedSub.setWeight(Integer.parseInt(subUser.get("weight")));
				subUserRepository.save(updatedSub);
			});
		} catch (Exception e) {
			throw e;
		}
	}
	
	// 자녀 계정 삭제
	@Override
	public void deleteSub(long sid) {
		SubUser su = subUserRepository.findById(sid).orElse(null);
		GetCt gc = su.getCid();
		su.setCid(null);
		getCtRepository.delete(gc);
		subUserRepository.deleteById(su.getSid());
	}
	
	// 캐릭터 선택
	
	// 캐릭터 변경
		
	// 획득한 캐릭터 목록 조회
}
