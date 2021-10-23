package com.ssafy.ssafit.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ssafy.ssafit.repository.MainuserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MainUserDetailsServiceImpl implements UserDetailsService {

	
	private final MainuserRepository mainuserRepository;
	
//	@Override
//	public UserDetails loadMainUserid(String userid) throws UsernameNotFoundException{
//		
//		
//		return mainuserRepository.findByUserId(userid).orElse(null);
//	}

	@Override
	public UserDetails loadUserByUsername(String userid) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return mainuserRepository.findByUserId(userid).orElse(null);
	}

}
