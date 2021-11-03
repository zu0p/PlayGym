package com.ssafy.ssafit.domain;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ApiResMessage {

	private int status;
	private Map<String,Object> result;
	private String message;
	
}
