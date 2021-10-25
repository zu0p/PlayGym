package com.ssafy.ssafit.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter
@ToString
public class Game {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id; // 기본키
	
	@NotNull
	private String gameName;
	
	
	
}
