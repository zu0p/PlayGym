package com.ssafy.ssafit.domain;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@ToString(exclude = {"subId","gameId"})
@NoArgsConstructor
public class Score {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id; // 기본키
	
	//kcal
	private int exp;
	
	@ManyToOne
	@JoinColumn(name="gameid")
	@NotNull
	private GameStage gameId;
	
	@ManyToOne
	@JoinColumn(name="subid")
	@NotNull
	@JsonIgnore
	private SubUser subId;
	
	private LocalDateTime datetime;

	public Score(int exp, @NotNull GameStage gameId, @NotNull SubUser subId) {
		this.exp = exp;
		this.gameId = gameId;
		this.subId = subId;
	}
	
	@PrePersist
	public void datetime() {
		this.datetime = LocalDateTime.now();
	}
	
	
}
