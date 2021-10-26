package com.ssafy.ssafit.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Builder
public class SubUser {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "INT UNSIGNED")
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

	@Builder
	public SubUser(String nickName, MainUser mainUser, int age, int tall, int weight, int cid) {
		this.nickName = nickName;
		this.mainUser = mainUser;
		this.age = age;
		this.tall = tall;
		this.weight = weight;
		this.cid = cid;
	}
	
	public void update(String nickName, MainUser mainUser, int age, int tall, int weight) {
		this.nickName = nickName;
		this.mainUser = mainUser;
		this.age = age;
		this.tall = tall;
		this.weight = weight;
	}
	
}

