package com.ssafy.ssafit.service;

import java.util.List;
import java.util.Map;

import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.dto.SubUserDto;

public interface MainUserService{

	public void deleteMember(long id);
	public boolean existId(String id);
	public List<SubUserDto> loginService(MainUser m);

}
