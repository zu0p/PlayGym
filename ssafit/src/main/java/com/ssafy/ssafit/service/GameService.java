package com.ssafy.ssafit.service;

import java.util.List;

import com.ssafy.ssafit.domain.Exercise;
import com.ssafy.ssafit.domain.Game;

public interface GameService {
	
	public List<Game> gameListUp();
	public List<Exercise> getExercise(int step, int count);

}
