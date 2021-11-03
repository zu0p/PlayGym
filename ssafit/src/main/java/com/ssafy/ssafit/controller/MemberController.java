package com.ssafy.ssafit.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.ssafit.domain.ApiResMessage;
import com.ssafy.ssafit.service.MainUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*" )
public class MemberController {
	
//	private MainUserService mainUserService;
//	
//	@DeleteMapping("/delete")
//	public ResponseEntity<ApiResMessage> deleteMember(@RequestParam long id){
//		Map<String,Object> ret = new HashMap<String, Object>();
//		try {
//			mainUserService.deleteMember(id);
//		} catch (Exception e) {
//			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"Deleted Error"),HttpStatus.INTERNAL_SERVER_ERROR);
//			
//		}
//		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"OK"),HttpStatus.INTERNAL_SERVER_ERROR);
//		
//	}
}
