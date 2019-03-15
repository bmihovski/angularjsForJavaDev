package com.atos.boyan.restful.client;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.atos.boyan.dto.UsersDTO;

public class UserRegistrationClient {

	private static RestTemplate restTemplate = new RestTemplate();

	private static final String USER_REGISTRATION_BASE_URL =
			"http://localhost:8080/api/user/";

	public UsersDTO getUserById(final Long userId) {
		return restTemplate.getForObject(
				USER_REGISTRATION_BASE_URL + "/{id}", UsersDTO.class, userId);
	}

	public static void main(String[] args) {
		UserRegistrationClient userRegistrationClient =
				new UserRegistrationClient();
		// post
		UsersDTO regUser = new UsersDTO();

		regUser.setName("Boyan test");
		regUser.setAddress("Test str");
		regUser.setEmail("boyan@test.com");
		UsersDTO newUser = userRegistrationClient.createUser(regUser);
		System.out.println(newUser.getId());

		UsersDTO user = userRegistrationClient.getUserById(1L);
		System.out.println("User-ID" + user.getId()
				+ " User-Name" + user.getName());
		// Response entity
		ResponseEntity<UsersDTO> responseEntity =
				userRegistrationClient.getUserByIdUsingExchangeAPI(1L);

		UsersDTO userEx = responseEntity.getBody();

		System.out.println(userEx.getName());
		//get all
		UsersDTO[] users = userRegistrationClient.getAllUsers();

		for (UsersDTO usersDTO : users) {
			System.out.println("User email: " + usersDTO.getEmail());
		}
		// put
		user.setName("Gosho");

		userRegistrationClient.updateUser(1L, user);

		System.out.println("Updated User name " + user.getName());

		System.out.println("Old users List: " +
				userRegistrationClient.getAllUsers().length);
		// delete
		userRegistrationClient.deleteUser(1L);

		System.out.println("New users List: " +
				userRegistrationClient.getAllUsers());

	}

	public UsersDTO[] getAllUsers() {
		return restTemplate.getForObject(USER_REGISTRATION_BASE_URL,
				UsersDTO[].class);
	}

	public UsersDTO createUser(final UsersDTO user) {
		return restTemplate.postForObject(
				USER_REGISTRATION_BASE_URL, user,
				UsersDTO.class);
	}

	public void updateUser(final Long userId, final UsersDTO user) {
		restTemplate.put(USER_REGISTRATION_BASE_URL + "/{id}",
				user, userId);
	}

	public void deleteUser(final Long userId) {
		restTemplate.delete(USER_REGISTRATION_BASE_URL + "/{id}",
				userId);
	}

	public ResponseEntity<UsersDTO> getUserByIdUsingExchangeAPI(final Long userId) {
		HttpEntity<UsersDTO> httpEntity = new HttpEntity<UsersDTO>(new UsersDTO());
		return restTemplate.exchange(USER_REGISTRATION_BASE_URL + "/{id}", HttpMethod.GET,
				httpEntity, UsersDTO.class, userId);
	}

}
