package com.ssafy.ssafit.dto;

import com.ssafy.ssafit.domain.GetCps;
import com.ssafy.ssafit.domain.RequestStatus;

import lombok.Getter;

@Getter
public class SubGetCpsListDTO {

	private String title;
	private String detail;
	private long cid;
	private int level;
	private long mainuser;
	private RequestStatus status;
	private long sort;
	
	public SubGetCpsListDTO(GetCps cps) {
		this.title = cps.getCpsid().getTitle();
		this.detail = cps.getCpsid().getDetail();
		this.cid = cps.getCpsid().getCid();
		this.mainuser = cps.getCpsid().getPid().getId();
		this.status = cps.getStatus();
		this.sort = cps.getId();
	}
	
	
	
	
	
}
