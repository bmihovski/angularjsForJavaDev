package com.boyan.Rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boyan.dto.UserDTO;
import com.boyan.repository.UserJpaRepository;

@RestController
@RequestMapping(value = "/api/user")
public class UserRegistrationRestController {

	public static final Logger logger = LoggerFactory
			.getLogger(UserRegistrationRestController.class);
	
	
	private UserJpaRepository repository;
	
	@Autowired
	public UserRegistrationRestController(UserJpaRepository repository) {
		this.repository = repository;
	}
	
	@GetMapping(value = "/")
	public ResponseEntity<List<UserDTO>> listUsers() {
		List<UserDTO> users = repository.findAll();
		
		return new ResponseEntity<List<UserDTO>>(users, HttpStatus.OK);
	}
	
	@PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDTO> createUser(@RequestBody final UserDTO user) {
		repository.save(user);
		return new ResponseEntity<UserDTO>(repository.findByName(user.getName()), 
				HttpStatus.CREATED);
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<UserDTO> getUserById(@PathVariable("id") final Long id) {
		return new ResponseEntity<UserDTO>(repository.findById(id).get(),
				HttpStatus.OK);
	}
	
	@PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDTO> updateUser(@PathVariable("id") final Long id,
			@RequestBody UserDTO user) {
		// fetch user based on id and set it to currentUser object of type UserDTO
		UserDTO currentUser = repository.findById(id).get();
		
		// update currentUser object data with user object data
		currentUser.setName(user.getName());
		currentUser.setAddress(user.getAddress());
		currentUser.setEmail(user.getEmail());
		
		// save current user object
		repository.saveAndFlush(currentUser);
		
		return new ResponseEntity<UserDTO>(repository.findById(id).get(),
				HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<UserDTO> deleteUser(@PathVariable("id") final Long id) {
		repository.deleteById(id);
		
		return new ResponseEntity<UserDTO>(HttpStatus.NO_CONTENT);
	}
	
}
