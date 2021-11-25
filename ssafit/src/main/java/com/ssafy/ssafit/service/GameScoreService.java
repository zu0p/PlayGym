package com.ssafy.ssafit.service;

import java.util.List;

import com.ssafy.ssafit.domain.Score;
import com.ssafy.ssafit.dto.SubGameStatusDTO;

public interface GameScoreService {

	public List<Score> getGameLog(long user);
	
	public void gameScoreSave(long user,long gameId);
	
	public List<SubGameStatusDTO> subUserGame(long user);
}
