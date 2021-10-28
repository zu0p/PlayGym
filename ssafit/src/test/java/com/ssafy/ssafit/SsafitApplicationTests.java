package com.ssafy.ssafit;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.ssafit.service.CompensationService;

@SpringBootTest
class SsafitApplicationTests {
	@Autowired
	private CompensationService compensationService;
	@Test
	void contextLoads() {
//		Map<String,Object> map = new HashMap<String, Object>();
//		
//		map.put("pid", 1);
//		map.put("exp", 2000);
//		map.put("title","한시간 놀아주세요!");
//		map.put("detail","저녁 10시 이후 한시간 놀 수 있어요");
//		map.put("basic",true);
		System.out.println("sd");
//		List<CompensationMapping> list = compensationService.findPidCps(1);
//		for(CompensationMapping c : list) {
//			System.out.println(c);
//		}
	}

}
