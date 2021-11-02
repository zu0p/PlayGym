package com.ssafy.ssafit;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.ssafit.service.MainUserService;

@SpringBootTest
class SsafitApplicationTests {
	@Autowired
	MainUserService mainUserService;
	@Test
	void whwh() {
		
		try {
			mainUserService.deleteMember(41);
		}catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
		}
		
	}

}
