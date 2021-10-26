package com.ssafy.ssafit.domain;

import javax.persistence.Entity;
import javax.persistence.FetchType;
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
public class Compensation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long cid;
	private int exp;
	private String title;
	private String detail;
	private boolean basic;
	
	@JoinColumn(name="pid")
	@ManyToOne(fetch = FetchType.LAZY)
	@NotNull
	private MainUser pid;
	
}
