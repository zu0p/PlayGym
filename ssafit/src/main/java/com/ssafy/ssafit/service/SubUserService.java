package com.ssafy.ssafit.service;

import java.util.List;
import java.util.Map;

import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.domain.SubUser;

public interface SubUserService {
	
	//서브(자녀) 계정 추가
	public void addSubUser(Map<String, String> subUser);
	
	//자신의 서브(자녀) 계정 목록 조회
	public List<SubUser> getMySubUserList(MainUser mainuser);
	
	//서브 계정 정보 조회
	public Map<String, Object> getSubUserInfo(long sid);
	
	//서브 계정 정보 수정
	public void modifySubUser(Map<String, String> subUser);
	
	//서브계정 삭제
	public void deleteSub(long sid);
	
	// 캐릭터 선택
	
	// 캐릭터 변경
		
	// 획득한 캐릭터 목록 조회
}
