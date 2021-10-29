package com.ssafy.ssafit.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpSession;
import javax.validation.ConstraintViolationException;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.annotation.ApplicationScope;

import com.ssafy.ssafit.domain.ApiResMessage;
import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.repository.MainuserRepository;
import com.ssafy.ssafit.security.JwtTokenProvider;
import com.ssafy.ssafit.service.MainUserService;

import ch.qos.logback.classic.Logger;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping
@RequiredArgsConstructor
@CrossOrigin(origins = "*" )
public class UserController {
	
	private final PasswordEncoder passwordEncoder;	
	private final JwtTokenProvider jwtTokenProvider;
	private final MainuserRepository userRepository;
	private final MainUserService mainUserService;
	
	@PostMapping("/join")
	public ResponseEntity<ApiResMessage> join(@RequestBody Map<String, String> user) {
//		Map<String,Object> ret = new HashMap<String, Object>();
		try {
			userRepository.save(MainUser.builder()
	                .userId(user.get("userid"))
					.email(user.get("email"))
	                .password(passwordEncoder.encode(user.get("password")))
	                .name(user.get("name"))
	                .phone(user.get("phone"))
	                .roles(Collections.singletonList("ROLE_USER")) //
	                .build()).getId();
		} catch(ConstraintViolationException e) {
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"propertyNull"),HttpStatus.INTERNAL_SERVER_ERROR);
		} catch (DataIntegrityViolationException e) {
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"existId"),HttpStatus.INTERNAL_SERVER_ERROR);
		}catch(Exception e) {
			return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"Faild"),HttpStatus.INTERNAL_SERVER_ERROR);
		} 
		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"회원가입이 완료되었습니다."),HttpStatus.OK);
	}
	
	 // 로그인
    @PostMapping("/login")
    public ResponseEntity<ApiResMessage> login(@RequestBody Map<String, String> user) {
    	MainUser member=null;
    	
    	try {
    		member = userRepository.findByUserId(user.get("userid")).orElse(null);
    	}catch(Exception e){
    		return new ResponseEntity<ApiResMessage>(new ApiResMessage(500,null,"Failed"),HttpStatus.INTERNAL_SERVER_ERROR);
    	}
        
        if (!passwordEncoder.matches(user.get("password"), member.getPassword())) {
        	return new ResponseEntity<ApiResMessage>(new ApiResMessage(401,null,"Failed"),HttpStatus.UNAUTHORIZED);
        }
        
        Map<String, Object> userinfo = new HashMap<String, Object>();
        userinfo.put("id", member.getId());
        userinfo.put("userId", member.getId());
        userinfo.put("email", member.getEmail());
        userinfo.put("name", member.getName());
        userinfo.put("phone", member.getPhone());
        userinfo.put("token", jwtTokenProvider.createToken(member.getUsername(), member.getRoles()));
        
        return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,userinfo,"Success"),HttpStatus.OK);
    }
    
    @GetMapping("/check")
    public ResponseEntity<ApiResMessage> IdCheck(@RequestParam String id){
    	if(!mainUserService.existId(id)) {
    		return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"existId"),HttpStatus.OK);
    	}
    	return new ResponseEntity<ApiResMessage>(new ApiResMessage(200,null,"Success"),HttpStatus.OK);
    }
    
    //비밀번호 확인 처리 요청
    @PostMapping("/checkPw")
    public boolean checkPw(@RequestBody Map<String, String> user) throws Exception {
    	MainUser member = userRepository.findByUserId(user.get("userid"))
                .orElseThrow(() -> new IllegalArgumentException("해당 유저가 없습니다."));
    	System.out.println(member);
    	boolean result = false;
    	if(passwordEncoder.matches(user.get("password"), member.getPassword())){
    		result = true;
    	}else {
    		result = false;
    	}
    	return result;
    }
    
    //부모 회원정보 조회
    @GetMapping("/search")
    public ResponseEntity<ApiResMessage> findUser(@RequestParam Long id) {
    	Optional<MainUser> user = userRepository.findById(id);
    	try {
    		user.get();
    	}catch(Exception e) {
    		return new ResponseEntity<ApiResMessage>(new ApiResMessage(500, null, "Not Find User"), HttpStatus.INTERNAL_SERVER_ERROR);
    	}
    	return new ResponseEntity<ApiResMessage>(new ApiResMessage(200, null, "Find User"), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    
    // 유저 정보 수정
    @PutMapping("/update")
    public Optional<MainUser> update(
    		@RequestParam Long id,
    		@RequestBody MainUser user){
//    	System.out.println("update");
    	Optional<MainUser> updateUser = userRepository.findById(id);
    	
    	updateUser.ifPresent(selectUser -> {
    		selectUser.setName(user.getName());
    		selectUser.setPassword(passwordEncoder.encode(user.getPassword()));
    		selectUser.setPhone(user.getPhone());
    		selectUser.setEmail(user.getEmail());
    		
    		userRepository.save(selectUser);
    	});
    	return updateUser;
    }
	
}
