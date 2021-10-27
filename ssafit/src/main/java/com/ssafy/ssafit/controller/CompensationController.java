package com.ssafy.ssafit.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.ssafit.domain.ApiResMessage;
import com.ssafy.ssafit.dto.CompensationMapping;
import com.ssafy.ssafit.service.CompensationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*" )
public class CompensationController {
	
	private final CompensationService compensationService;
	@GetMapping("/cps")
	public ResponseEntity<ApiResMessage> findPidCompensation(@RequestParam long id){
		Map<String, Object> map = new HashMap<String, Object>();
		List<CompensationMapping> list = compensationService.findPidCps(1);
		if(list.size()==0||list==null) {
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(204,null,"No Content"),HttpStatus.NO_CONTENT);
		}
		map.put("list",list);
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,map,"Failed"),HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PostMapping("/cps")
	public ResponseEntity<ApiResMessage> insertCompensation(@RequestBody Map<String, Object> map){
		try {
			compensationService.saveCompensation(map);
		}catch(Exception e){
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"Failed"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"Success"),HttpStatus.OK);
	}
}
