package com.ssafy.ssafit.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.ConstraintViolationException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ssafy.ssafit.domain.ApiResMessage;
import com.ssafy.ssafit.domain.Characters;
import com.ssafy.ssafit.domain.GetCt;
import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.domain.SubUser;
import com.ssafy.ssafit.repository.CharacterRepository;
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
	private final CharacterRepository characterRepository;
	
	// 서브 계정 추가
	@Override
	public void addSubUser(Map<String, String> subUser) {
		try {
			subUserRepository.save((SubUser.builder()
					.nickName(subUser.get("nickName"))
					.age(Integer.parseInt(subUser.get("age")))
					.weight(Integer.parseInt(subUser.get("weight")))
					.tall(Integer.parseInt(subUser.get("tall")))
					.mainUser(mainuserRepository.findById(Long.parseLong(subUser.get("id"))).get())
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
	public List<Map<String, Object>> getMySubUserList(long id) {
		List<Map<String, Object>> result = null;
		try {
			MainUser m = mainuserRepository.findById(id).get();
			List<SubUser> temp = subUserRepository.findByMainUser(m).orElse(null);
			if(temp != null) {
				result = new ArrayList<Map<String,Object>>();
				for(SubUser su :  temp) {
					Map<String, Object> obj = new HashMap<String, Object>();
					obj.put("sid", su.getSid());
					obj.put("nickName", su.getNickName());
					obj.put("age", su.getAge());
					obj.put("weight", su.getWeight());
					obj.put("tall", su.getTall());
					
					result.add(obj);
				}
			}
			
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
				obj.put("id", subUser.getMainUser().getId());
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
		try {
			SubUser su = subUserRepository.findBySid(sid).get();
			if(su != null) {
				GetCt gc = su.getCid();
				if(gc != null) getCtRepository.delete(gc);
				su.setCid(null);
				subUserRepository.deleteById(sid);
			}
		}
		catch (Exception e) {
			throw e;
		}
	}
	
	 // 획득한 캐릭터 조회
	@Override
	public List<Map<String, Object>> getMyCharacters(long sid) {
		List<Map<String, Object>> result = null;
		try {
			List<GetCt> list = getCtRepository.findBySid(sid);
			if(list != null) {
				result = new ArrayList<Map<String, Object>>();
				for(GetCt gc : list) {
					Map<String, Object> obj = new HashMap<String, Object>();
					obj.put("character", gc.getCtid());
					result.add(obj);
				}
			}
		} catch (Exception e) {
			throw e;
		}
		return result;
	}
	
	// 캐릭터 획득
	@Override
	public void getCharacter(Map<String, Object> input) {
		try {
			long sid = (long) input.get("sid");
			long ctid = (long) input.get("ctid");
			SubUser s = subUserRepository.findBySid(sid).orElse(null);
			Characters c = characterRepository.findById(ctid).orElse(null);
			GetCt gc = GetCt.builder().ctid(c).sid(s).build();
			getCtRepository.save(gc);
		} catch (Exception e) {
			throw e;
		}
	}
	
	// 캐릭터 선택(변경)
	@Override
	public void setMyCharacter(Map<String, Object> input) {
		try {
			long ctid = (long) input.get("ctid");
			long sid = (long) input.get("sid");
			SubUser s = subUserRepository.findBySid(sid).orElse(null);
			Characters c = characterRepository.findById(ctid).orElse(null);
			GetCt gc = getCtRepository.findBySidAndCtid(s, c);
			s.setCid(gc);
		} catch (Exception e) {
			throw e;
		}
	}
}
