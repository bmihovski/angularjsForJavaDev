package com.atos.boyan.restful.client;

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
		UsersDTO user = userRegistrationClient.getUserById(1L);
		System.out.println("User-ID" + user.getId()
				+ " User-Name" + user.getName());

		UsersDTO[] users = userRegistrationClient.getAllUsers();

		for (UsersDTO usersDTO : users) {
			System.out.println("User email: " + usersDTO.getEmail());
		}

	}

	public UsersDTO[] getAllUsers() {
		return restTemplate.getForObject(USER_REGISTRATION_BASE_URL,
				UsersDTO[].class);
	}

}
