package com.ssafy.ssafit.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
	
	@OneToMany(mappedBy = "gid", fetch = FetchType.LAZY,cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
	@JsonIgnoreProperties({"gid"})
	private List<GameStage> gamestage = new ArrayList<>();
	
	
}
