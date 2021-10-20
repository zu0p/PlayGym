package com.ssafy.ssafit.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.sun.istack.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter
@ToString
public class Score {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id; // 기본키
	
	private int star;
	
	@ManyToOne
	@JoinColumn(name="gameid")
	@NotNull
	private Game gameId;
	
	@ManyToOne
	@JoinColumn(name="subid")
	@NotNull
	private SubUser subId;
	
}
