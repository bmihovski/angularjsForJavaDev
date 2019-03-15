package com.atos.boyan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.atos.boyan.dto.UserInfo;

public interface UserInfoJpaRepository extends JpaRepository<UserInfo, Long> {
	public UserInfo findByUsername(String username);
}
