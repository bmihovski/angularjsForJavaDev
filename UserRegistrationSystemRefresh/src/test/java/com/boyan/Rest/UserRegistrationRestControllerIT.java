package com.boyan.Rest;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.when;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.charset.Charset;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.boyan.dto.UsersDTO;
import com.boyan.repository.UserJpaRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@AutoConfigureRestDocs
public class UserRegistrationRestControllerIT {

	@Autowired
	MockMvc mockMvc;

	@MockBean
	UserJpaRepository userJpaRepositoryMock;

	private MediaType contentType;
	private UsersDTO user;


	@Before
	public void setUp() {
		contentType = new MediaType(MediaType.APPLICATION_JSON.getType(), MediaType.APPLICATION_JSON.getSubtype(),
				Charset.forName("utf-8"));
		user = new UsersDTO();
		user.setName("Icho");
		user.setAddress("opa str");
		user.setEmail("test@test.com");
	}

	@Test
	@WithMockUser(username = "user")
	public void shouldReturnSuccessMessage() throws Exception {

		when(this.userJpaRepositoryMock.findById(1L)).thenReturn(Optional.of(user));

		this.mockMvc.perform(get("/api/user/1")).andExpect(status().isOk())
				.andExpect(content().contentType(contentType)).andExpect(jsonPath("$.name", is("Icho")))
				.andExpect(jsonPath("$.address", is("opa str"))).andExpect(jsonPath("$.email", is("test@test.com")))
				.andDo(document("{ClassName}/{methodName}", preprocessRequest(prettyPrint()),
						preprocessResponse(prettyPrint()),
						responseFields(fieldWithPath("id").description("User Identifier"),
								fieldWithPath("name").description("User Name"),
								fieldWithPath("address").description("User Address"),
								fieldWithPath("email").description("User e-mail"))))
				.andDo(print());
	}

}
