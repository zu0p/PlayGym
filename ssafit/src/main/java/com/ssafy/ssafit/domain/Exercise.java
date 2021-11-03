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
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter
@NoArgsConstructor
@ToString(exclude = {"execSub"})
public class Exercise {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(unique=true)
	@NotNull
	private String name;
	
	@NotNull
	private int step;
	
	@OneToMany(mappedBy = "exec",fetch = FetchType.EAGER, cascade= {CascadeType.REMOVE})
	@JsonIgnoreProperties({"exec"})
	@OrderBy("process ASC")
	private List<ExerciseSub> execSub=new ArrayList<>();
}
