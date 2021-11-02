package com.ssafy.ssafit.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.ssafit.service.CharacterService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*" )
public class CharacterController {
	
	@Autowired
	CharacterService characterService;
	
	@GetMapping("/chars")
	public ResponseEntity<List<Map<String, Object>>> getAllCharacters(){
		List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
		try {
			result = characterService.getAllCharacters();
		}
		catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<Map<String,Object>>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(result == null) return new ResponseEntity<List<Map<String,Object>>>(result, HttpStatus.NO_CONTENT);
		return new ResponseEntity<List<Map<String,Object>>>(result, HttpStatus.OK);
	}
}
