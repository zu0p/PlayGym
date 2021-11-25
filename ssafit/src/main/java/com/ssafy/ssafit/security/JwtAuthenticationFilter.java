package com.ssafy.ssafit.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean{

	private final JwtTokenProvider jwtTokenProvider;
	 
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		 // 헤더에서 JWT 를 받아옵니다.
//		  HttpServletRequest req = (HttpServletRequest) request;
//	        HttpServletResponse res = (HttpServletResponse) response;
//
//	        res.setHeader("Access-Control-Allow-Origin", "*");
////	        response.setHeader("Access-Control-Allow-Credentials", "true");
//	        res.setHeader("Access-Control-Allow-Methods","*");
//	        res.setHeader("Access-Control-Max-Age", "3600");
//	        res.setHeader("Access-Control-Allow-Headers",
//	                "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//
//	        if("OPTIONS".equalsIgnoreCase(req.getMethod())) {
//	        	res.setStatus(HttpServletResponse.SC_OK);
//	        }else {
	        	
	        	 String token = jwtTokenProvider.resolveToken((HttpServletRequest) request);
	             // 유효한 토큰인지 확인합니다.
	              if (token != null && jwtTokenProvider.validateToken(token)) {
	                 // 토큰이 유효하면 토큰으로부터 유저 정보를 받아옵니다.
	                 Authentication authentication = jwtTokenProvider.getAuthentication(token);
	                 // SecurityContext 에 Authentication 객체를 저장합니다.
	                  SecurityContextHolder.getContext().setAuthentication(authentication);
	             }
	            chain.doFilter(request, response);
//	        }
       
        
	}

}
