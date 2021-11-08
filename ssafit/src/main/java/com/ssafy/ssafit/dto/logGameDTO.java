package com.ssafy.ssafit.dto;

import java.time.LocalDateTime;

import com.ssafy.ssafit.domain.Score;

import lombok.Getter;

@Getter
public class logGameDTO {
	
	private int exp;
	
	private String gameName;
	
	private int step;
	
	private LocalDateTime time;
	
	public logGameDTO(Score score) {
		this.exp=score.getExp();
		this.gameName=score.getGameId().getGid().getGameName();
		this.step=score.getGameId().getAgeStep();
		this.time=score.getDatetime();
	}
	

}
