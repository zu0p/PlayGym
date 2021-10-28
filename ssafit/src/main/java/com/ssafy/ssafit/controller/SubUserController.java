package com.ssafy.ssafit.controller;

import java.util.List;
import java.util.Map;

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
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.ssafit.domain.ApiResMessage;
import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.domain.SubUser;
import com.ssafy.ssafit.service.SubUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "*" )
public class SubUserController {
 
//	@Autowired
	private final SubUserService subUserService;
	
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
	@GetMapping("/sub/{mainuser}")
	public ResponseEntity<List<SubUser>> getMySubUserList(@PathVariable MainUser mainuser) {
		List<SubUser> result = null;
		try {
			result = subUserService.getMySubUserList(mainuser);
		} catch (Exception e) {
			return new ResponseEntity<List<SubUser>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<List<SubUser>>(result, HttpStatus.OK);
	}
	
	// 서브 유저 정보 조회
	@GetMapping("/sub/profile/{sid}")
	public ResponseEntity<Map<String, Object>> getSubUserInfo(@PathVariable long sid) {
		Map<String, Object> result = null;;
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
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"Deleted Error"),HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"OK"),HttpStatus.OK);
	}
	
	// 캐릭터 선택
	
	// 캐릭터 변경
	
	// 획득한 캐릭터 목록 조회
}
