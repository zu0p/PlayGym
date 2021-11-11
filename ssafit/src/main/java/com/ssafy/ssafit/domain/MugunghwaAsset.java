package com.ssafy.ssafit.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class MugunghwaAsset {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id; // 기본키
	
	@ManyToOne(fetch =FetchType.EAGER)
	@JoinColumn(name = "level", referencedColumnName = "id")
	@NotNull
	private MugunghwaModel mugunghwaModel;
	
	private String name;
	
	private String imgLink;
	
	private String description;
	
	private int classNumber;
}
