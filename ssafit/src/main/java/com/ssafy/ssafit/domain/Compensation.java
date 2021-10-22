package com.ssafy.ssafit.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
	@ManyToOne
	private MainUser pid;
	
	@JoinColumn(name="pid")
	@ManyToOne
	private SubUser sid;
}
