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

import com.ssafy.ssafit.service.MainUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*" )
public class MemberController {
	
	private final MainUserService mainUserService;
	
	@DeleteMapping("/delete")
	public ResponseEntity<Map<String,Object>> deleteMember(@RequestParam long id){
		Map<String,Object> ret = new HashMap<String, Object>();
		try {
			mainUserService.deleteMember(id);
		} catch (Exception e) {
			ret.put("result", "삭제하는데 문제가 발행했습니다.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ret);
			
		}
		ret.put("result", "정상적으로 삭제되었습니다.");
		return ResponseEntity.status(HttpStatus.OK).body(ret);
		
	}
	
	@GetMapping("/test")
	public String sd() {
		return "why";
	}

}
