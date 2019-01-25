package com.atos.boyan.Rest;

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

import com.atos.boyan.dto.UsersDTO;
import com.atos.boyan.repository.UserJpaRepository;


@RestController
@RequestMapping("/api/user")
public class UserRegistrationRestController {
	public static final Logger LOGGER =
						LoggerFactory.getLogger(UserRegistrationRestController.class);
	private UserJpaRepository userJpaRepository;

	@Autowired
	public void setUserJpaRepository(UserJpaRepository userJpaRepository) {
		this.userJpaRepository = userJpaRepository;
	}

	@GetMapping("/")
	public ResponseEntity<List<UsersDTO>> listAllUsers() {
		List<UsersDTO> users = userJpaRepository.findAll();
		return new ResponseEntity<List<UsersDTO>>(users, HttpStatus.OK);
	}

	@PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UsersDTO> createUser(@RequestBody final UsersDTO user) {
		userJpaRepository.save(user);
		return new ResponseEntity<UsersDTO>(user, HttpStatus.CREATED);
	}

	@GetMapping("/{id}")
	public ResponseEntity<UsersDTO> getUserById(@PathVariable("id") final Long id) {
		UsersDTO user = userJpaRepository.findById(id);
		return new ResponseEntity<UsersDTO>(user, HttpStatus.OK);
	}

	@PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UsersDTO> updateUser(@PathVariable("id") final Long id,
			@RequestBody UsersDTO user) {
		// fetch based on id and set it to currentUser object of type UsersDTO
		UsersDTO currentUser = userJpaRepository.findById(id);

		// update currentUser object data with user object data
		currentUser.setName(user.getName());
		currentUser.setAddress(user.getAddress());
		currentUser.setEmail(user.getEmail());

		// save current user object
		userJpaRepository.saveAndFlush(currentUser);

		// return ResponseEntity object
		return new ResponseEntity<UsersDTO>(currentUser, HttpStatus.OK);

	}

	@DeleteMapping("/{id}")
	public ResponseEntity<UsersDTO> deleteUser(@PathVariable("id") final Long id) {
		userJpaRepository.delete(id);
		return new ResponseEntity<UsersDTO>(HttpStatus.NO_CONTENT);
	}

}
