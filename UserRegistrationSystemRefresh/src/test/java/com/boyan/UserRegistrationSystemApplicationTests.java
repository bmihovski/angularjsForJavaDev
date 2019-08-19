package com.boyan;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.boyan.Rest.ServiceAuthenticate;
import com.boyan.Rest.UserRegistrationRestController;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserRegistrationSystemApplicationTests {
	
	@Autowired
	private ServiceAuthenticate servAuth;
	@Autowired
	private UserRegistrationRestController restContrl;
	
	@Test
	public void contextLoads() {
		assertThat(servAuth).isNotNull();
		assertThat(restContrl).isNotNull();
	}

}
