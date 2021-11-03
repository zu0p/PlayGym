package com.ssafy.ssafit;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.ssafit.repository.GameRepository;
import com.ssafy.ssafit.service.GameService;
import com.ssafy.ssafit.service.MainUserService;

@SpringBootTest
class SsafitApplicationTests {
	@Autowired
	MainUserService mainUserService;
	
	@Autowired
	GameService gameService;
	@Test
	void whwh() {
		
		
			System.out.println(gameService.getExercise(1, 1));	
		
		
	}

}
