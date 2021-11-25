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

import org.hibernate.annotations.ColumnDefault;

import org.hibernate.annotations.ColumnDefault;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"getchracters", "getCompensation"})
public class SubUser {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(columnDefinition = "INT UNSIGNED")
	private long sid; // 기본키
	
	@NotNull
	private String nickName;
	
	@ManyToOne(fetch =FetchType.EAGER)
	@JoinColumn(name="mainuser")
	@NotNull
	private MainUser mainUser;
	
	@NotNull
	private int age;
	@NotNull
	private int tall;
	@NotNull
	private int weight;
	
	private int exp;
	@JoinColumn(name = "cid")
	@OneToOne
	private GetCt cid;
	
	@ColumnDefault("1")
	@NotNull
	private int level;
	
	@ColumnDefault("100")
	@NotNull
	private int max;
	
	@OneToMany (mappedBy = "sid", cascade = CascadeType.REMOVE)
	private List<GetCt> getchracters = new ArrayList<>();
	
	@OneToMany(mappedBy = "subid", cascade = CascadeType.REMOVE)
	private List<GetCps> getCompensation = new ArrayList<>();

	@Builder
	public SubUser(String nickName, MainUser mainUser, int age, int tall, int weight) {
		this.nickName = nickName;
		this.age = age;
		this.tall = tall;
		this.weight = weight;
		this.mainUser = mainUser;
	}
	
	public void update(String nickName, MainUser mainUser, int age, int tall, int weight) {
		this.nickName = nickName;
		this.mainUser = mainUser;
		this.age = age;
		this.tall = tall;
		this.weight = weight;
	}
	
}

