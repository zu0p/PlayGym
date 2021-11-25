package com.ssafy.ssafit.service;

import java.util.List;
import java.util.Map;

import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.domain.SubUser;
import com.ssafy.ssafit.dto.SubUserInfoDto;

public interface SubUserService {
	
	//서브(자녀) 계정 추가
	public void addSubUser(Map<String, String> subUser);
	
	//자신의 서브(자녀) 계정 목록 조회
	public List<Map<String, Object>> getMySubUserList(long id);
	
	//서브 계정 정보 조회
	public Map<String, Object> getSubUserInfo(long sid);
	
	//서브 계정 정보 수정
	public void modifySubUser(Map<String, String> subUser);
	
	//서브계정 삭제
	public void deleteSub(long sid);
		
	// 획득한 캐릭터 목록 조회
	public List<Map<String, Object>> getMyCharacters(long sid);
	
	// 캐릭터 획득
	public void getCharacter(Map<String, String> input);
	
	// 캐릭터 선택(변경)
	public void setMyCharacter(Map<String, String> input) throws Exception;
	
	// 캐릭터 삭제 (테스트용)
	public void deleteAllMyCharacter(Map<String, String> input);

	//서브 유저 데이터 통합 요청
	public SubUserInfoDto getSubUserData(long sid);
}
