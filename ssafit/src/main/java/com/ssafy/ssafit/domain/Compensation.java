package com.ssafy.ssafit.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter
@ToString
public class Compensation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long cid;
	
//	private int level;
	
	private String title;
	
	private String detail;
	
	//lombok getter 시 getBasicX isBasic
	private boolean basic;
	
	@JoinColumn(name="pid")
	@ManyToOne(fetch = FetchType.LAZY)
	@NotNull
	@JsonIgnore
	private MainUser pid;
	
	
	@OneToMany(mappedBy = "cpsid", cascade = CascadeType.ALL)
	@JsonIgnore
	private List<GetCps> gets = new ArrayList<>(); 

	
}
