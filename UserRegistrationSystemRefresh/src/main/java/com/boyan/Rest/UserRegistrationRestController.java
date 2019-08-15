package com.boyan.Rest;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

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

import com.boyan.Exception.CustomErrorType;
import com.boyan.dto.UsersDTO;
import com.boyan.repository.UserJpaRepository;

@RestController
@RequestMapping(value = "/api/user")
public class UserRegistrationRestController {

	public static final Logger logger = LoggerFactory.getLogger(UserRegistrationRestController.class);

	private UserJpaRepository repository;

	@Autowired
	public UserRegistrationRestController(UserJpaRepository repository) {
		this.repository = repository;
	}

	@GetMapping(value = "/")
	public ResponseEntity<List<UsersDTO>> listUsers() {
		List<UsersDTO> users = repository.findAll();
		if (users.isEmpty()) {
			return new ResponseEntity<List<UsersDTO>>(HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<List<UsersDTO>>(users, HttpStatus.OK);
	}

	@PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UsersDTO> createUser(@Valid @RequestBody final UsersDTO user) {
		if (repository.findByName(user.getName()) != null) {
			return new ResponseEntity<UsersDTO>(
					new CustomErrorType("User with the same " + user.getName() + " already exist"),
					HttpStatus.CONFLICT);
		}

		repository.save(user);
		return new ResponseEntity<UsersDTO>(user, HttpStatus.CREATED);
	}

	@GetMapping(value = "/{id}")
	public ResponseEntity<UsersDTO> getUserById(@PathVariable("id") final Long id) {
		Optional<UsersDTO> user = repository.findById(id);

		if (user.isEmpty()) {
			return new ResponseEntity<UsersDTO>(new CustomErrorType("User with id " + id + " not found"),
					HttpStatus.NOT_FOUND);
		}

		return new ResponseEntity<UsersDTO>(user.get(), HttpStatus.OK);

	}

	@PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UsersDTO> updateUser(@PathVariable("id") final Long id, @RequestBody UsersDTO user) {
		// fetch user based on id and set it to currentUser object of type UserDTO
		UsersDTO currentUser = repository.findById(id).orElse(null);

		if (currentUser == null) {
			return new ResponseEntity<UsersDTO>(
					new CustomErrorType("Unable to update." + "User with id " + id + " not found"),
					HttpStatus.NOT_FOUND);
		}

		// update currentUser object data with user object data
		currentUser.setName(user.getName());
		currentUser.setAddress(user.getAddress());
		currentUser.setEmail(user.getEmail());

		// save current user object
		repository.saveAndFlush(currentUser);

		return new ResponseEntity<UsersDTO>(repository.findById(id).get(), HttpStatus.OK);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<UsersDTO> deleteUser(@PathVariable("id") final Long id) {
		Optional<UsersDTO> userForDeletion = repository.findById(id);
		
		if (userForDeletion.isEmpty()) {
			return new ResponseEntity<UsersDTO>(new CustomErrorType("Unable to delete. "
					+ "User with id " + id + " not found."), HttpStatus.NOT_FOUND);
		}
		
		repository.deleteById(id);

		return new ResponseEntity<UsersDTO>(HttpStatus.NO_CONTENT);
	}

}
