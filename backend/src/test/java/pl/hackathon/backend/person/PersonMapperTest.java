package pl.hackathon.backend.person;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PersonMapperTest {

    @Test
    void mapToPersonDTO() {
        // Given
        Person person = new Person("Test Name", "test@email.com");
        person.setId(1L);

        // When
        PersonDTO personDTO = PersonMapper.mapToPersonDTO(person);

        // Then
        assertEquals(person.getId(), personDTO.id());
        assertEquals(person.getNameAndSurname(), personDTO.nameAndSurname());
        assertEquals(person.getEmail(), personDTO.email());
    }

    @Test
    void mapToPerson() {
        // Given
        PersonDTO personDTO = new PersonDTO(1L, "Test Name", "test@email.com");

        // When
        Person person = PersonMapper.mapToPerson(personDTO);

        // Then
        assertEquals(personDTO.nameAndSurname(), person.getNameAndSurname());
        assertEquals(personDTO.email(), person.getEmail());
    }
}