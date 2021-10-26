package com.ssafy.ssafit.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.ssafit.domain.Compensation;
import com.ssafy.ssafit.repository.CompensationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompensationServiceImpl implements CompensationService {

	private final CompensationRepository compensationRepository;
	@Override
	public List<Compensation> findPidCompensation(long id) {

		return null;
	}

}
