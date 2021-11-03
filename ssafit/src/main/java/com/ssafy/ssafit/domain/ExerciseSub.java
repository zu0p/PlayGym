package com.ssafy.ssafit.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Sort;
import org.hibernate.annotations.SortNatural;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import net.bytebuddy.build.HashCodeAndEqualsPlugin.Sorted;

@Entity
@Getter @Setter
@NoArgsConstructor
@ToString
public class ExerciseSub {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@NotNull
	private String imgLink;

	private String modelLink;
	
	private String metaLink;
	@NotNull
	@SortNatural
	private int process;
	@ManyToOne
	@NotNull
	@JoinColumn
	private Exercise exec;
	
}
