package com.ssafy.ssafit.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ssafy.ssafit.domain.Characters;
import com.ssafy.ssafit.repository.CharacterRepository;

public class CharacterServiceImpl implements CharacterService {

	private CharacterRepository characterRepository;
	
	@Override
	public List<Map<String, Object>> getAllCharacters() {
		
		List<Map<String, Object>> result = null;
		
		try {
			List<Characters> list = characterRepository.findAll();
			result = new ArrayList<Map<String,Object>>();
			
			if(list != null) {
				for(Characters c : list) {
					Map<String, Object> obj = new HashMap<String, Object>();
					obj.put("id", c.getId());
					obj.put("name", c.getName());
					obj.put("image", c.getImageLink());
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
