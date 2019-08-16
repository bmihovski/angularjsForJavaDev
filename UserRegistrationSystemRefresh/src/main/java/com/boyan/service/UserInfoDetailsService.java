package com.boyan.service;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.boyan.dto.UserInfo;
import com.boyan.repository.UserInfoJpaRepository;

@Service
public class UserInfoDetailsService implements UserDetailsService {

	private UserInfoJpaRepository repository;
	
	@Autowired
	public UserInfoDetailsService(UserInfoJpaRepository repository) {
		this.repository = repository;
	}
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserInfo user = repository.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("Ops! user not found with username: " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUsername(),
				user.getPassword(), getAuthorities(user));
	}


	private Collection<? extends GrantedAuthority> getAuthorities(UserInfo user) {
		List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(user.getRole());
		return authorities;
	}

}
