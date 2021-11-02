package com.ssafy.ssafit.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.ssafit.domain.Characters;
import com.ssafy.ssafit.repository.CharacterRepository;
import com.ssafy.ssafit.repository.CompensationRepository;
import com.ssafy.ssafit.repository.GetCpsRepository;
import com.ssafy.ssafit.repository.SubUserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class CharacterServiceImpl implements CharacterService {

	@Autowired
	private CharacterRepository characterRepository;
	
	@Override
	public List<Map<String, Object>> getAllCharacters() {
		
		List<Map<String, Object>> result = new ArrayList<Map<String,Object>>();
		
		try {
			List<Characters> list = characterRepository.findAll();
			
			if(list != null) {
				result = new ArrayList<Map<String,Object>>();
				for(Characters c : list) {
					Map<String, Object> obj = new HashMap<String, Object>();
					obj.put("id", c.getId());
					obj.put("name", c.getName());
					obj.put("image", c.getImage_link());
					obj.put("price", c.getPrice());
					result.add(obj);
				}
			}	
		}
		catch (Exception e) {
			throw e;
		}
		return result;

	}
}
