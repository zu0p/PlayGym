package com.ssafy.ssafit.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface MainUserDetailsService {

	public UserDetails loadMainUserid(String token);
}
