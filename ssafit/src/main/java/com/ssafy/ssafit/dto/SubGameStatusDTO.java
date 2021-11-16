package com.ssafy.ssafit.dto;

import com.ssafy.ssafit.domain.SubUser;

import lombok.Getter;

@Getter
public class SubGameStatusDTO {
	
	private int exp;
	private int kcal;
	private String img;
	private long sid;
	private String name;
	private int max;
	
	public SubGameStatusDTO(int exp, int kcal,String img,long sid,String name,int max) {
		this.exp=exp;
		this.kcal=kcal;
		this.img=img;
		this.sid = sid;
		this.name = name;
		this.max = max;
	}

}
