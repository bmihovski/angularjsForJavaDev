package com.atos.boyan;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.charset.Charset;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.atos.boyan.Rest.UserRegistrationRestController;
import com.atos.boyan.dto.UsersDTO;
import com.atos.boyan.repository.UserJpaRepository;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers=UserRegistrationRestController.class)
@ContextConfiguration(classes=UserRegistrationSystemApplication.class)
public class UserRegistrationControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private UserJpaRepository userJpaRepositoryMock;

	private MediaType contentType;
	private UsersDTO user;

	@Before
	public void setup() {
		contentType = new MediaType(MediaType.APPLICATION_JSON.getType(),
				MediaType.APPLICATION_JSON.getSubtype(),
				Charset.forName("utf-8"));
		user = new UsersDTO();
		user.setName("Boyan Test");
		user.setAddress("city Test, str. Test");
		user.setEmail("email@test.com");
	}

	@Test
	public void shouldReturnSuccessMessage() throws Exception {
		when(this.userJpaRepositoryMock.findById(1L)).thenReturn(user);

		this.mockMvc.perform(get("/api/user/1"))
			.andExpect(status().isOk())
			.andExpect(content().contentType(contentType))
			.andExpect(jsonPath("$.name", is("Boyan Test")))
			.andExpect(jsonPath("$.address", is("city Test, str. Test")))
			.andExpect(jsonPath("$.email", is("email@test.com")))
			.andDo(print());

	}

}
