package com.ssafy.ssafit.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.ssafit.domain.Exercise;
import com.ssafy.ssafit.domain.Game;
import com.ssafy.ssafit.repository.ExerciseRepository;
import com.ssafy.ssafit.repository.GameRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GameServiceImpl implements GameService {

	
	private final GameRepository gameRepository;
	private final ExerciseRepository exerciseRepository;
	
	@Override
	public List<Game> gameListUp() {
		// TODO Auto-generated method stub
		
		return gameRepository.findAll();
	}

	@Override
	public List<Exercise> getExercise(int step, int count) {
		List<Exercise> list = exerciseRepository.findByStep(step).orElse(new ArrayList<Exercise>());
		
		
		if(count>list.size()) {
			count = list.size();
		}
		List<Exercise> listUp = new ArrayList<Exercise>();
		HashSet<Integer> set = new HashSet<Integer>();
		int random=-1;
		for(int i=0;i<count;i++) {
			random = (int)(Math.random()*list.size());
			if(set.contains(random)) {
				i--;
			}else {
				set.add(random);
				listUp.add(list.get(random));
			}
		}
			
		return listUp;
	}

}
