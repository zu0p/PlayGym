package com.ssafy.ssafit.dto;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.ssafit.domain.Characters;

import lombok.Setter;

@Setter
public class SubUserInfoDto {
	
	@JsonProperty
	String image;
	@JsonProperty
	String characterName;
	@JsonProperty
	int level;
	@JsonProperty
	int max;
	@JsonProperty
	String nickName;
	@JsonProperty
	int tall;
	@JsonProperty
	int weight;
	@JsonProperty
	long id;
	@JsonProperty
	int exp;
	@JsonProperty
	int age;
	@JsonProperty
	long sid;
	@JsonProperty
	List<Long> characters;
	@JsonProperty
	List<Map<String,Object>> goals;	
}
