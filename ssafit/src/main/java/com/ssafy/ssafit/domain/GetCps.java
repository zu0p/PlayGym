package com.ssafy.ssafit.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetCps {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne
	@JoinColumn(name="subid")
	@NotNull
	private SubUser subid;
	
	@ManyToOne
	@JoinColumn(name="cpsid")
	@NotNull
	private Compensation cpsid; 
	
	@Enumerated(EnumType.STRING)
	private RequestStatus status; //요청상태 [Request, Wait]
	
	
	//새롭게 생성시
	public GetCps(SubUser subid, Compensation cpsid) {
		this.subid=subid;
		this.cpsid=cpsid;
		this.status=RequestStatus.Wait;
	}
}
