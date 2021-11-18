package com.ssafy.ssafit.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.ssafit.domain.FollowmeModel;
import com.ssafy.ssafit.domain.Game;
import com.ssafy.ssafit.domain.MugunghwaModel;
import com.ssafy.ssafit.dto.FollowmeDto;
import com.ssafy.ssafit.dto.MugunghwaDto;
import com.ssafy.ssafit.repository.FollowmeModelRepository;
import com.ssafy.ssafit.repository.GameRepository;
import com.ssafy.ssafit.repository.MugunghwaModelRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GameServiceImpl implements GameService {

	
	private final GameRepository gameRepository;
	private final FollowmeModelRepository followmeModelRepository;
	private final MugunghwaModelRepository mugunghwaModelRepository;
	
	
	@Override
	public List<Game> gameListUp() {
		// TODO Auto-generated method stub
		
		return gameRepository.findAll();
	}

	@Override
	public FollowmeDto getFollowmeDto(int level) {
		FollowmeDto result = null;
		try {
			result = new FollowmeDto();
			FollowmeModel model = followmeModelRepository.findByLevel(level);
			result.setMetaLink(model.getMetaLink());
			result.setModelLink(model.getModelLink());
			model.getFollowmeAsset();
			boolean[] selected = new boolean[model.getFollowmeAsset().size()];
			int[] temp = new int[model.getFollowmeAsset().size()];
			Random r = new Random();
			for(int i = 0; i < model.getFollowmeAsset().size(); i++) {
				temp[i] = r.nextInt(model.getFollowmeAsset().size());
				if(selected[temp[i]]) i--;
				selected[temp[i]] = true;
			}
			List<Map<String, Object>> assets = new ArrayList<Map<String, Object>>(); 
			for(int i = 0; i < temp.length; i++) {
				
				// 악어 제외
				if(model.getFollowmeAsset().get(temp[i]).getName().equals("악어")) continue;
				
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("aid", model.getFollowmeAsset().get(temp[i]).getId());
				map.put("image", model.getFollowmeAsset().get(temp[i]).getImgLink());
				map.put("name", model.getFollowmeAsset().get(temp[i]).getName());
				map.put("classNumber", model.getFollowmeAsset().get(temp[i]).getClassNumber());
				assets.add(map);
			}
			result.setAsset(assets);
		} catch (Exception e) {
			throw e;
		}	
		return result;
	}

	@Override
	public MugunghwaDto getMugunghwaDto(int level) {
		MugunghwaDto result = null;
		try {
			result = new MugunghwaDto();
			MugunghwaModel model = mugunghwaModelRepository.findByLevel(level);
			result.setMetaLink(model.getMetaLink());
			result.setModelLink(model.getModelLink());
			model.getMugunghwaAsset();
			boolean[] selected = new boolean[model.getMugunghwaAsset().size()];
			int[] temp = new int[model.getMugunghwaAsset().size()];
			Random r = new Random();
			for(int i = 0; i < model.getMugunghwaAsset().size(); i++) {
				temp[i] = r.nextInt(model.getMugunghwaAsset().size());
				if(selected[temp[i]]) i--;
				selected[temp[i]] = true;
			}
			List<Map<String, Object>> assets = new ArrayList<Map<String, Object>>();
			for(int i = 0; i < temp.length; i++) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("aid", model.getMugunghwaAsset().get(temp[i]).getId());
				map.put("image", model.getMugunghwaAsset().get(temp[i]).getImgLink());
				map.put("name", model.getMugunghwaAsset().get(temp[i]).getName());
				map.put("classNumber", model.getMugunghwaAsset().get(temp[i]).getClassNumber());
				assets.add(map);
			}
			result.setAsset(assets);
		} catch (Exception e) {
			throw e;
		}
		return result;
	}

}
