package com.ssafy.ssafit.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.ssafit.domain.Characters;

import lombok.Setter;

@Setter
public class SubUserDto {

	@JsonProperty
	long sid;
	@JsonProperty
	String nickName;
	@JsonProperty
	Characters characters;
}
