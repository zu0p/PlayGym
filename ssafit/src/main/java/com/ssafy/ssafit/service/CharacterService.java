package com.ssafy.ssafit.service;

import java.util.List;
import java.util.Map;

public interface CharacterService {
	
	//캐릭터 전체 조회
	List<Map<String, Object>> getAllCharacters();
	
}
