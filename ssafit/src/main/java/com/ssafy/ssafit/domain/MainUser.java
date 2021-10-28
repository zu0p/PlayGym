package com.ssafy.ssafit.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter @Setter
@ToString(exclude = {"subUsers"})
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MainUser implements UserDetails{
	
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
	
	@Column(unique=true)
	@NotNull
	private String userId;
	
	//유저 비밀번호
	@NotNull
	private String password;
	
	//유저 이름
	@NotNull
	private String name;
	
	//유저 이메일
	
	@Email
	@NotNull
	private String email;
	
	//유저 전화번호
	@NotNull
	private String phone;
	
	@OneToMany(mappedBy = "mainUser")
	private List<SubUser> subUsers = new ArrayList<SubUser>();
	
	
	@ElementCollection(fetch = FetchType.EAGER)
	@Builder.Default
	private List<String> roles = new ArrayList<>();

	public void addSubUsers(SubUser s) {
		this.subUsers.add(s);
		s.setMainUser(this);
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return userId;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return false;
	}

}
