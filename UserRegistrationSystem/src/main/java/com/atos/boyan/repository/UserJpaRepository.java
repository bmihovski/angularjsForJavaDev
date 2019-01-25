package com.atos.boyan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.atos.boyan.dto.UsersDTO;


@Repository
public interface UserJpaRepository extends JpaRepository<UsersDTO, Long> {
	UsersDTO findByName(String name);

	UsersDTO findById(Long id);
};
