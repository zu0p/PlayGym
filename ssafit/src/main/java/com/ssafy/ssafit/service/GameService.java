package com.ssafy.ssafit.service;

import java.util.List;

import com.ssafy.ssafit.domain.Game;
import com.ssafy.ssafit.dto.FollowmeDto;
import com.ssafy.ssafit.dto.MugunghwaDto;

public interface GameService {
	
	public List<Game> gameListUp();
	
	//날 따라해봐요 게임 데이터 요청
	public FollowmeDto getFollowmeDto(int level);
	//무궁화꽃이 피었습니다 게임 데이터 요청
	public MugunghwaDto getMugunghwaDto(int level);	
}
