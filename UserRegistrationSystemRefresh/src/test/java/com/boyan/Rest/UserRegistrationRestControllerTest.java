package com.boyan.Rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Spy;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;

import com.boyan.UserRegistrationSystemApplicationRefresh;
import com.boyan.dto.UsersDTO;
import com.boyan.repository.UserJpaRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = UserRegistrationSystemApplicationRefresh.class,
webEnvironment = WebEnvironment.RANDOM_PORT)
public class UserRegistrationRestControllerTest {
	
	@Spy
	private UserRegistrationRestController userRegistrationRestController;
	
	@Mock
	private UserJpaRepository userJpaRepository;
	
	@Before
	public void setUp() {
		userRegistrationRestController = new UserRegistrationRestController();
		ReflectionTestUtils.setField(userRegistrationRestController,
				"repository", userJpaRepository);
	}
	
	@Test
	public void testAllUsers() {
		List<UsersDTO> usersList = new ArrayList<UsersDTO>();
		usersList.add(new UsersDTO());
		when(this.userJpaRepository.findAll()).thenReturn(usersList);
		
		ResponseEntity<List<UsersDTO>> responseEntity =
				this.userRegistrationRestController.listUsers();
		
		assertThat(responseEntity)
			.matches(c -> c.getStatusCode().is2xxSuccessful())
			.matches(u -> u.getBody().size() == 1);
	}
	
	@After
	public void tearDown() {
		userRegistrationRestController = null;
	}

}
