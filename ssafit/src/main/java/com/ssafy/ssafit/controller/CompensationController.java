package com.ssafy.ssafit.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
import com.ssafy.ssafit.domain.GetCps;
import com.ssafy.ssafit.domain.RequestStatus;
import com.ssafy.ssafit.dto.SubGetCpsListDTO;
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
		List<Compensation> list=null;
		try {
			list = compensationService.findPidCps(id);
		}catch (Exception e) {
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"Faild"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(list.size()==0||list==null) {
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(204,null,"No Content"),HttpStatus.NO_CONTENT);
		}
		map.put("list",list);
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,map,"Success"),HttpStatus.OK);
	}
	
	@PostMapping("/cps")
	public ResponseEntity<ApiResMessage> insertCompensation(@RequestBody Map<String, Object> map){
		try {
			compensationService.saveCompensation(map);
		}catch(Exception e){
			e.printStackTrace();
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
	
	@GetMapping("/sub/cpslist")
	public ResponseEntity<ApiResMessage> subCpsList(@RequestParam long sid){
		Map<String,Object> map = new HashMap<String, Object>();
		List<GetCps> list=null;
		List<SubGetCpsListDTO> res =null;
		try {
			list = compensationService.subUserlist(sid);
			res=list.stream().map(SubGetCpsListDTO::new).collect(Collectors.toList());
		}catch (Exception e) {
			
		}
		
		map.put("result", res);
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,map,"Success"),HttpStatus.OK);
	}
	
	@PostMapping("/sub/req")
	public ResponseEntity<ApiResMessage> reqCps(@RequestBody Map<String,String> map ){
		
		long sid = Long.parseLong(map.get("sid"));
		try {
			List<GetCps> list=compensationService.subUserlist(sid);
			for(GetCps gc :list) {
				if(gc.getStatus()==RequestStatus.Wait) {
					compensationService.subUserReqCps(gc);
					break;
				}
			}
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"Success"),HttpStatus.OK);
	}
	
	
}
