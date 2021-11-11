package com.ssafy.ssafit.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Leveltb {

	@Id
	private int level;
	@NotNull
	private int exp;
}
