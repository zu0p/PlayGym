package com.ssafy.ssafit.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.ssafit.domain.GetCt;
import com.ssafy.ssafit.domain.MainUser;
import com.ssafy.ssafit.domain.SubUser;
import com.ssafy.ssafit.dto.SubUserDto;
import com.ssafy.ssafit.repository.GetCtRepository;
import com.ssafy.ssafit.repository.MainuserRepository;
import com.ssafy.ssafit.repository.SubUserRepository;
import com.ssafy.ssafit.security.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class MainUserServiceImpl implements MainUserService {

	private final MainuserRepository mainuserRepository;
	private final SubUserRepository subUserRepository;
	private final GetCtRepository getCtRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtTokenProvider jwtTokenProvider;

	@Override
	@Transactional
	public void deleteMember(long id) {
		MainUser m = mainuserRepository.findById(id).orElse(null);
		List<SubUser> sub = subUserRepository.findByMainUser(m).orElse(null);
		for (SubUser sb : sub) {
			GetCt gc = sb.getCid();
			sb.setCid(null);
			getCtRepository.delete(gc);
			subUserRepository.deleteById(sb.getSid());
		}
		mainuserRepository.deleteById(id);
	}

	@Override
	public boolean existId(String id) {
		MainUser m = mainuserRepository.findByUserId(id).orElse(null);

		if (m == null) {
			return true;
		}
		return false;
	}

	@Override
	public List<SubUserDto> loginService(MainUser m) {

		System.out.println("test");
		List<SubUser> list = subUserRepository.findByMainUser(m).orElse(null);

		List<SubUserDto> sub = new ArrayList<SubUserDto>();
		for (SubUser s : list) {
			SubUserDto sb = new SubUserDto();
			sb.setSid(s.getSid());
			sb.setNickName(s.getNickName());
			if (s.getCid() != null) {

				for (GetCt gc : s.getGetchracters()) {
					if (s.getCid().getId() == gc.getId()) {
						sb.setCharacters(gc.getCtid());
						break;
					}
				}
			}
			sub.add(sb);
		}

		return sub;
	}

}
