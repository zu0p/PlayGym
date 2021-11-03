package com.ssafy.ssafit.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.ssafit.domain.Game;

public interface GameRepository extends JpaRepository<Game, Long>{

}
