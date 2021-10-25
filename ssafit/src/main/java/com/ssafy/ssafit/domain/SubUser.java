package com.ssafy.ssafit.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter
@ToString
public class SubUser {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long sid; // 기본키
	private String nickName;
	
	@ManyToOne
	@JoinColumn(name="mainuser")
	@NotNull
	private MainUser mainUser;
	
	private int age;
	private int tall;
	private int weight;
	private long cid;

}

