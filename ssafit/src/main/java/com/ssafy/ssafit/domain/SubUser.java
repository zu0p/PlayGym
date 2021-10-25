package com.ssafy.ssafit.domain;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
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
	
	@NotNull
	private String nickName;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="mainuser")
	@NotNull
	private MainUser mainUser;
	
	@NotNull
	private int age;
	private int tall;
	@NotNull
	private int weight;
	
	@OneToOne(fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
	@JoinColumn(name="cid")
	private GetCt cid;

}

