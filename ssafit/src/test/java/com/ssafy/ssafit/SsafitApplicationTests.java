package com.ssafy.ssafit;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.ssafy.ssafit.domain.Compensation;
import com.ssafy.ssafit.dto.CompensationMapping;
import com.ssafy.ssafit.repository.SubUserRepository;
import com.ssafy.ssafit.service.CompensationService;

import lombok.RequiredArgsConstructor;

@SpringBootTest
@RequiredArgsConstructor
class SsafitApplicationTests {
	
	private final CompensationService compensationService;
	private final SubUserRepository subUserRepository;
	
	
	//@Test
	void contextLoads() {
//		subUserRepository.findById(id)
	}

}
