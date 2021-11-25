package com.ssafy.ssafit.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.ssafit.domain.GameStage;
import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.domain.Score;
import com.ssafy.ssafit.domain.SubUser;
import com.ssafy.ssafit.dto.SubGameStatusDTO;
import com.ssafy.ssafit.repository.GameStageRepository;
import com.ssafy.ssafit.repository.MainuserRepository;
import com.ssafy.ssafit.repository.ScoreRepository;
import com.ssafy.ssafit.repository.SubUserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GameScoreServiceImpl implements GameScoreService{

	private final ScoreRepository scoreRepository;
	private final SubUserRepository subUserRepository;
	private final GameStageRepository gameStageRepository;
	private final MainuserRepository mainuserRepository;
	@Override
	public List<Score> getGameLog(long user) {
		
		SubUser sb= subUserRepository.getById(user);
		if(sb==null) {
			throw new NullPointerException();
		}
		
		List<Score> list= scoreRepository.findBySubId(sb);
		return list;
	}

	@Override
	@Transactional
	public void gameScoreSave(long user, long gameId) {
		// TODO Auto-generated method stub
		SubUser su = subUserRepository.findById(user).orElse(null);
		GameStage gs = gameStageRepository.findById(gameId).orElse(null);
		if(su==null||gs==null) {
			throw new NullPointerException();
		}
		float met = gs.getMet();
		//소비 산소량
		double emt = met *(3.5 * su.getWeight() * gs.getTime())*0.001;
		//산소량 1L당 5kcal 소모
		int kcal = (int)Math.ceil(emt * 5);
		
		Score score = new Score((int)kcal, gs, su);
		int exp = su.getExp();
		su.setExp(exp+(kcal*5));
		scoreRepository.save(score);
	}

	@Override
	public List<SubGameStatusDTO> subUserGame(long user) {
		
		MainUser mainuser = mainuserRepository.findById(user).orElse(null);
		List<SubGameStatusDTO> status = new ArrayList<SubGameStatusDTO>();
		if(mainuser==null) {
			throw new NullPointerException();
		}
		List<Score> list=null;
		int total;
		for(SubUser su : mainuser.getSubUsers()) {
			
			total=0;
			list = scoreRepository.findBySubId(su);
			
			for(Score s : list) {
				total+=s.getExp();
			}
			
			status.add(new SubGameStatusDTO(su.getExp(), total,su.getCid().getCtid().getImage_link(),su.getSid(),su.getNickName(),su.getMax()));
			
		}
		
		return status;
	}

}
