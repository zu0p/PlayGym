package com.ssafy.ssafit.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.sun.istack.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter
@ToString
public class MainUser {
	
	// auto와 identity 차이
	// auto의 경우 jpa 시퀀스를 들고와서 id를 생성하여 insert (추가적인 connection pool 증가, Reason|시퀀스 값 확인을 위해 사전 select update문 실행)
	// identity 바로 가능
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@Column(columnDefinition = "LONG UNSIGNED")
	private long id;
	
	//유저 아이디
	//@Column(nullable = false) vs @NotNull
	//@NotNull 어노테이션을 쓰면, 데이터베이스에 SQL 쿼리를 보내기 전에 예외가 발생
	
	//nullable=false null을 넣은 엔티티를 생성하면 생성이 된 뒤 Repository에 전달되고,
	//이 값이 DB에 넘어간 뒤에 예외가 발생해 위험한 오류
	@NotNull
	private String userId;
	
	//유저 비밀번호
	@NotNull
	private String password;
	
	//유저 이름
	@NotNull
	private String name;
	
	//유저 이메일
	@NotNull
	private String email;
	
	//유저 전화번호
	@NotNull
	private String phone;

}
