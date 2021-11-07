package com.ssafy.ssafit.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class FollowmeModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id; // 기본키
	
	@NotNull
	private int level;
	
	@NotNull
	private String modelLink;
	
	@NotNull
	private String metaLink;
	
	@OneToMany
	@JoinColumn(name = "level")
	private List<FollowmeAsset> followmeAsset;
}
