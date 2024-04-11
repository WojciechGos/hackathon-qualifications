package pl.hackathon.backend.person;

import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.databind.ObjectMapper;
import pl.hackathon.backend.person.Person;
import pl.hackathon.backend.person.PersonRepository;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser("john")
public class PersonControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private PersonRepository personRepository;

    @AfterEach
    void tearDown() {
        personRepository.deleteAll();
    }


    @Test
    void canUpdatePerson() throws Exception {
        //given
        Person person = new Person("John Doe", "john@gmail.com");
        personRepository.save(person);

        Person updatedPerson = new Person("Jonathan Doer", "john2@gmail.com");

        //when
        ResultActions response = mockMvc.perform(patch("/api/v1/persons/{id}", person.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedPerson)));

        //then
        response.andExpect(status().isOk())
                .andDo(print());

        Person actualPerson = personRepository.findById(person.getId()).get();

        assertThat(actualPerson.getNameAndSurname()).isEqualTo(updatedPerson.getNameAndSurname());
        assertThat(actualPerson.getEmail()).isEqualTo(updatedPerson.getEmail());
    }
}