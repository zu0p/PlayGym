package com.ssafy.ssafit;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.ssafit.repository.GameRepository;
import com.ssafy.ssafit.service.GameScoreService;
import com.ssafy.ssafit.service.GameService;
import com.ssafy.ssafit.service.MainUserService;

@SpringBootTest
class SsafitApplicationTests {
	@Autowired
	GameScoreService gameScoreService;
	
	@Autowired
	GameService gameService;
//	@Test
	void whwh() {
		
//		gameScoreService.gameScoreSave(15,1);
			System.out.println(gameScoreService.getGameLog(15));	
		
		
	}

}
