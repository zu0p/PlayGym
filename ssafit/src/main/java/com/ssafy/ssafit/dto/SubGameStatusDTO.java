package com.ssafy.ssafit.dto;

import lombok.Getter;

@Getter
public class SubGameStatusDTO {
	
	private int exp;
	private int kcal;
	
	public SubGameStatusDTO(int exp, int kcal) {
		this.exp=exp;
		this.kcal=kcal;
	}

}
