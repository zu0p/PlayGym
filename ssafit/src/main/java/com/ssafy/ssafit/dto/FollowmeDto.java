package com.ssafy.ssafit.dto;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Setter;

@Setter
public class FollowmeDto {
	
	@JsonProperty
	String metaLink;
	@JsonProperty
	String modelLink;
	@JsonProperty
	List<Map<String, Object>> asset;
}
