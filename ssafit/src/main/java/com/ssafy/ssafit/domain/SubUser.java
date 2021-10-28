package com.ssafy.ssafit.domain;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
public class SubUser {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "INT UNSIGNED")
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
	
	@OneToMany(mappedBy = "sid")
	private List<GetCt> getchracters = new ArrayList<>();
	
	@OneToMany(mappedBy = "subid")
	private List<GetCps> getCompensation = new ArrayList<>();

	@Builder
	public SubUser(String nickName, MainUser mainUser, int age, int tall, int weight, GetCt cid) {
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

