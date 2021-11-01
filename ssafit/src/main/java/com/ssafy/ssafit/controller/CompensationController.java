package com.ssafy.ssafit.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.ssafit.domain.ApiResMessage;
import com.ssafy.ssafit.domain.Compensation;
import com.ssafy.ssafit.dto.CompensationMapping;
import com.ssafy.ssafit.service.CompensationService;
import com.ssafy.ssafit.service.GetCpsService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*" )
public class CompensationController {
	
	private final CompensationService compensationService;
	private final GetCpsService getCpsService;
	@GetMapping("/cps")
	public ResponseEntity<ApiResMessage> findPidCompensation(@RequestParam long id){
		Map<String, Object> map = new HashMap<String, Object>();
		List<CompensationMapping> list=null;
		try {
			list = compensationService.findPidCps(id);
		}catch (Exception e) {
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"Faild"),HttpStatus.NO_CONTENT);
		}
		
		if(list.size()==0||list==null) {
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(204,null,"No Content"),HttpStatus.NO_CONTENT);
		}
		map.put("list",list);
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,map,"Success"),HttpStatus.INTERNAL_SERVER_ERROR);
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
	
	@DeleteMapping("/getcps")
	public ResponseEntity<ApiResMessage> deletegetCps(@RequestParam long id){
		try {
			getCpsService.deleteGetCps(id);
		}catch(Exception e) {
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"Failed"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"Success"),HttpStatus.OK);
	}
	
	@DeleteMapping("/cps")
	public ResponseEntity<ApiResMessage> deleteCompensation(@RequestParam long id){
		try {
			compensationService.deleteCps(id);
		}catch(Exception e) {
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"Failed"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"Success"),HttpStatus.OK);
	}
	
	@PostMapping("/getcps")
	public ResponseEntity<ApiResMessage> getCps(@RequestBody Map<String,Object> map){
		try {
			getCpsService.insertGetCps((List<Object>) map.get("child"), Long.valueOf(String.valueOf(map.get("cid"))));
		}catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"Failed"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"Success"),HttpStatus.OK);
	}
	
	
	public ResponseEntity<ApiResMessage> requestCps(){
		try {
			
		}catch (Exception e) {
			
		}
		
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"Success"),HttpStatus.OK);
	}
	
	
}
