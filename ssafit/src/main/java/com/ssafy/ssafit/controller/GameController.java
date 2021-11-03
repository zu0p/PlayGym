package com.ssafy.ssafit.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.ssafit.domain.ApiResMessage;
import com.ssafy.ssafit.domain.Exercise;
import com.ssafy.ssafit.domain.Game;
import com.ssafy.ssafit.domain.GameStage;
import com.ssafy.ssafit.service.GameService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
@CrossOrigin(origins = "*" )
public class GameController {

	private final GameService gameService;
	
	@GetMapping
	public ResponseEntity<ApiResMessage> gamelist(){
		Map<String,Object> map = new HashMap<>();
		List<Game> list=null;
		try {
			list=gameService.gameListUp();
		}catch (Exception e) {
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,map,"Failed"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
			map.put("Game",list);
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,map,"Success"),HttpStatus.OK);
		
	}
	@GetMapping("/exc")
	public ResponseEntity<ApiResMessage> gameStepList(@RequestParam int step, @RequestParam int random){
		Map<String,Object> map = new HashMap<>();
		List<Exercise> list=null;
		try {
			list = gameService.getExercise(step, random);
//			if(list==null) {
//				return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,map,"Limited"),HttpStatus.INTERNAL_SERVER_ERROR);
//			}
			if(list.size()==0) {
				return new ResponseEntity<ApiResMessage>(new ApiResMessage(204,map,"Failed"),HttpStatus.NO_CONTENT);
			}
		}catch (Exception e) {
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,map,"Failed"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
			map.put("Game",list);
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,map,"Success"),HttpStatus.OK);
		
	}
}
