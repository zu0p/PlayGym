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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.ssafit.domain.ApiResMessage;
import com.ssafy.ssafit.domain.Score;
import com.ssafy.ssafit.dto.SubGameStatusDTO;
import com.ssafy.ssafit.dto.SubUserInfoDto;
import com.ssafy.ssafit.dto.logGameDTO;
import com.ssafy.ssafit.service.GameScoreService;
import com.ssafy.ssafit.service.GetCpsService;
import com.ssafy.ssafit.service.SubUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*" )
public class SubUserController {
 
//	@Autowired
	private final SubUserService subUserService;
	private final GameScoreService gameScoreService;
	
	// 서브 계정 추가
	@PostMapping("/sub/add")
	public ResponseEntity<ApiResMessage> addSubUser(@RequestBody Map<String, String> subUser){
		try {
			subUserService.addSubUser(subUser);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"Server Error"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"add ok"),HttpStatus.OK); 
	}
	
	// 서브 계정(자녀) 계정 목록 조회
	@GetMapping("/sub/{id}")
	public ResponseEntity<List<Map<String, Object>>> getMySubUserList(@PathVariable long id) {
		List<Map<String, Object>>result = null;
		try {
			result = subUserService.getMySubUserList(id);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<Map<String, Object>>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(result == null) 
			return new ResponseEntity<List<Map<String,Object>>>(HttpStatus.NO_CONTENT);
		return new ResponseEntity<List<Map<String, Object>>>(result, HttpStatus.OK);
	}
	
	// 서브 유저 정보 조회
	@GetMapping("/sub/profile/{sid}")
	public ResponseEntity<Map<String, Object>> getSubUserInfo(@PathVariable long sid) {
		Map<String, Object> result = null;
		try {
			result = subUserService.getSubUserInfo(sid);
		} catch (Exception e) {
			return new ResponseEntity<Map<String, Object>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<Map<String, Object>>(result, HttpStatus.OK);
	}
	
	// 자녀 계정 정보 수정
	@PutMapping("/sub/modify")
	public ResponseEntity<ApiResMessage> modifySubUser(@RequestBody Map<String, String> subUser) {
		try {
			subUserService.modifySubUser(subUser);
		}
		catch (Exception e) {
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"서브 계정 수정 실패"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"OK"),HttpStatus.OK);
	}
	
	// 자녀 계정 정보 삭제
	@DeleteMapping("/sub/{sid}")
	public ResponseEntity<ApiResMessage> delete(@PathVariable long sid) {
		try {
			subUserService.deleteSub(sid);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"Deleted Error"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"OK"),HttpStatus.OK);
	}
	
	// 캐릭터 획득하기
	@PostMapping("/sub/getch")
	public ResponseEntity<ApiResMessage> getCharacter(@RequestBody Map<String, String> input){
		try {
			subUserService.getCharacter(input);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"Error"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"OK"),HttpStatus.OK);
	}
	
	// 획득한 캐릭터 목록 조회
	@GetMapping("/sub/mych/{sid}")
	public ResponseEntity<List<Map<String, Object>>> getMyCharacters(@PathVariable long sid) {
		List<Map<String, Object>> result = null;
		try {
			result = subUserService.getMyCharacters(sid);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<Map<String, Object>>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		if(result == null) return new ResponseEntity<List<Map<String,Object>>>(HttpStatus.NO_CONTENT);
		
		return new ResponseEntity<List<Map<String,Object>>>(result, HttpStatus.OK);
	}
	
	// 대표 캐릭터 선택
	@PutMapping("/sub/setch")
	public ResponseEntity<ApiResMessage> setMyCharacter(@RequestBody Map<String, String> input){
		try {
			subUserService.setMyCharacter(input);
		} catch(Exception e) {
			e.printStackTrace();
			return new ResponseEntity<ApiResMessage>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"OK"),HttpStatus.OK);
	}
	
//	//서브유저 캐릭터 삭제
//	@DeleteMapping("/sub/delall")
//	public ResponseEntity<ApiResMessage> deleteAllMyCharacter(@RequestBody Map<String, String> input){
//		try {
//			subUserService.deleteAllMyCharacter(input);
//		} catch(Exception e) {
//			e.printStackTrace();
//			return new ResponseEntity<ApiResMessage>(HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//		
//		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"OK"),HttpStatus.OK);
//	}
	
	@PostMapping("/sub/log")
	public ResponseEntity<ApiResMessage> saveGamelog(@RequestBody Map<String,Long> map){
		try {
			gameScoreService.gameScoreSave(map.get("user"), map.get("gameid"));
		}catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<ApiResMessage>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"OK"),HttpStatus.OK);
		
	}
	@GetMapping("/sub/log")
	public ResponseEntity<ApiResMessage> getGamelog(@RequestParam long user){
		Map<String,Object> map = new HashMap<String, Object>();
		List<Score> list=null;
		List<logGameDTO> dto=null;
		try {
			list =gameScoreService.getGameLog(user);
			dto=list.stream().map(logGameDTO::new).collect(Collectors.toList());
		}catch(Exception e){
			e.printStackTrace();
			return new ResponseEntity<ApiResMessage>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		map.put("log",dto);
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,map,"OK"),HttpStatus.OK);
	}
	
	@GetMapping("/sub/status")
	public ResponseEntity<ApiResMessage> getSubUserGame(@RequestParam long user){
		Map<String,Object> map = new HashMap<String, Object>();
		List<SubGameStatusDTO> list=null;
		try {
			list = gameScoreService.subUserGame(user);
		}catch(Exception e) {
			return new ResponseEntity<ApiResMessage>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		map.put("subusers",list);
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,map,"OK"),HttpStatus.OK);
	}
	
	//
	@GetMapping("/sub/info")
	public ResponseEntity<SubUserInfoDto> getSubUserData(@RequestParam long sid){
		SubUserInfoDto result = null;
		try {
			result = subUserService.getSubUserData(sid);
		} catch (Exception e) {
			return new ResponseEntity<SubUserInfoDto>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<SubUserInfoDto>(result, HttpStatus.OK);
	}
	
}
