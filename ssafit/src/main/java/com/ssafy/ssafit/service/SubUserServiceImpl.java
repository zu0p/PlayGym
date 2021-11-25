package com.ssafy.ssafit.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolationException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.ssafit.domain.Characters;
import com.ssafy.ssafit.domain.GetCps;
import com.ssafy.ssafit.domain.GetCt;
import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.domain.SubUser;
import com.ssafy.ssafit.dto.SubGetCpsListDTO;
import com.ssafy.ssafit.dto.SubUserInfoDto;
import com.ssafy.ssafit.repository.CharacterRepository;
import com.ssafy.ssafit.repository.GetCpsRepository;
import com.ssafy.ssafit.repository.GetCtRepository;
import com.ssafy.ssafit.repository.MainuserRepository;
import com.ssafy.ssafit.repository.SubUserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@Service
public class SubUserServiceImpl implements SubUserService {

	private final SubUserRepository subUserRepository;
	private final GetCtRepository getCtRepository;
	private final MainuserRepository mainuserRepository;
	private final CharacterRepository characterRepository;
	private final GetCpsRepository getCpsRepository;
	
	// 서브 계정 추가
	@Override
	public void addSubUser(Map<String, String> subUser) {
		try {
			MainUser m = mainuserRepository.findById(Long.parseLong(subUser.get("id"))).get();
			
			List<SubUser> temp = subUserRepository.findByMainUser(m).get();
			int[] gclist = new int[5];
			
			for(SubUser s: temp) {
				if(s.getCid() == null) continue;
				gclist[(int) s.getCid().getCtid().getId()]++;
			}
			
			long cid = 1;
			for(int i = 1; i < gclist.length; i++) {
				if(gclist[i] < gclist[(int)cid]) { 
					cid = (long)i;
				}
			}
			SubUser newSubUser = SubUser.builder()
					.nickName(subUser.get("nickName"))
					.age(Integer.parseInt(subUser.get("age")))
					.weight(Integer.parseInt(subUser.get("weight")))
					.tall(Integer.parseInt(subUser.get("tall")))
					.mainUser(m)
					.build();
			newSubUser.setMax(100);
			newSubUser.setLevel(1); // defalut value 적용 안되어서 추가
			subUserRepository.save(newSubUser);
			Characters c = characterRepository.findById(cid).orElse(null);
			if(getCtRepository.findBySidAndCtid(newSubUser, c) == null) {
				GetCt gc = GetCt.builder().ctid(c).sid(newSubUser).build();
				getCtRepository.save(gc);
				newSubUser.setCid(gc);
			}
			subUserRepository.save(newSubUser);
			
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
					
					if(su.getCid() != null) obj.put("image" , su.getCid().getCtid().getImage_link());
					else obj.put("image", null);
					
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
				obj.put("exp", subUser.getExp());
				obj.put("level", subUser.getLevel());
				obj.put("max", subUser.getMax());
				if(subUser.getCid() != null) obj.put("image" , subUser.getCid().getCtid().getImage_link());
				else obj.put("image", null);
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
				getCtRepository.deleteBySid(su);
				subUserRepository.delete(su);
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
			List<GetCt> list = getCtRepository.findBySid(subUserRepository.findById(sid).get());
			if(list != null) {
				result = new ArrayList<Map<String, Object>>();
				for(GetCt gc : list) {
					Map<String, Object> obj = new HashMap<String, Object>();
					Characters c = gc.getCtid();
					obj.put("id", c.getId());
					obj.put("name", c.getName());
					obj.put("price", c.getPrice());
					obj.put("image", c.getImage_link());
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
	public void getCharacter(Map<String, String> input) {
		try {
			long sid = Long.parseLong(input.get("sid"));
			long cid = Long.parseLong(input.get("cid"));
			SubUser s = subUserRepository.findBySid(sid).orElse(null);
			Characters c = characterRepository.findById(cid).orElse(null);
			s.setExp(s.getExp() - s.getMax());
			
			subUserRepository.save(s);
			if(getCtRepository.findBySidAndCtid(s, c) != null) return;
			
			GetCt gc = GetCt.builder().ctid(c).sid(s).build();
			getCtRepository.save(gc);
		} catch (Exception e) {
			throw e;
		}
	}
	
	// 캐릭터 선택(변경)
	@Override
	public void setMyCharacter(Map<String, String> input) throws Exception {
		try {
			long sid = Long.parseLong(input.get("sid"));
			long cid = Long.parseLong(input.get("cid"));
			SubUser s = subUserRepository.findBySid(sid).orElse(null);
			Characters c = characterRepository.findById(cid).orElse(null);
			GetCt gc = getCtRepository.findBySidAndCtid(s, c);
			
			if(gc == null) throw new Exception("GC NOT FOUND");
			
			s.setCid(gc);
			subUserRepository.save(s);
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	public void deleteAllMyCharacter(Map<String, String> input) {
		try {
			long sid = Long.parseLong(input.get("sid"));
			SubUser s = subUserRepository.findBySid(sid).orElse(null);
			s.setCid(null);
			getCtRepository.deleteAllBySid(s);
			subUserRepository.save(s);
		} catch (Exception e) {
			throw e;
		}
	}

	@Override
	public SubUserInfoDto getSubUserData(long sid) {
		SubUserInfoDto result = null;
		try {
			Optional<SubUser> s = subUserRepository.findBySid(sid);
			if(s != null) {
				result = new SubUserInfoDto();
				SubUser subUser = s.get();
				result.setSid(sid);
				result.setAge(subUser.getAge());
				result.setTall(subUser.getTall());
				result.setWeight(subUser.getWeight());
				result.setNickName(subUser.getNickName());
				result.setId(subUser.getMainUser().getId());
				result.setExp(subUser.getExp());
				result.setLevel(subUser.getLevel());
				result.setMax(subUser.getMax());
				result.setImage(subUser.getCid().getCtid().getImage_link());
				result.setCharacterName(subUser.getCid().getCtid().getName());
				
				List<GetCt> list = getCtRepository.findBySid(subUserRepository.findById(sid).get());
				if(list != null) {
					List<Long> characters = new ArrayList<Long>();
					for(GetCt gc : list) {
						characters.add(gc.getCtid().getId());
					}
					result.setCharacters(characters);
				}
				List<GetCps> cps = getCpsRepository.findBySubid(s.get()).orElse(null);
				List<Map<String,Object>> goals = new ArrayList<Map<String,Object>>();
				
				for(GetCps now : cps) {
					Map<String,Object> map = new HashMap<String, Object>();
					map.put("title", now.getCpsid().getTitle());
					map.put("detail", now.getCpsid().getDetail());
					map.put("cid", now.getCpsid().getCid());
					map.put("status", now.getStatus());
					goals.add(map);
				}
				result.setGoals(goals);
			}	
			
		} catch (Exception e) {
			throw e;
		}
		return result;
	}
}
