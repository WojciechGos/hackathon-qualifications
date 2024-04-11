package pl.hackathon.backend.person;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.hackathon.backend.exception.ResourceNotFoundException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PersonServiceTest {
    @Mock
    private PersonRepository personRepository;
    private PersonService underTest;

    private Person person;
    @BeforeEach
    void setUp() {
        underTest = new PersonService(personRepository);
        person = new Person("before each", "before@each.com");
        person.setId(1L); // Set the ID for the person

    }

    @Test
    void canAddPerson() {
        // Given
        Person person = new Person("test test", "valid@email.com");
        // When
        underTest.addPerson(person);
        // Then
        ArgumentCaptor<Person> personArgumentCaptor = ArgumentCaptor.forClass(Person.class);
        verify(personRepository).save(personArgumentCaptor.capture());
        Person capturedPerson = personArgumentCaptor.getValue();
        assertThat(capturedPerson).isEqualTo(person);
    }

//    @Test
//    void updatePersonById() {
//        // Given
//        Long id = 1L;
//        Person updatedPerson = new Person("Updated Name", "updated@email.com");
//        updatedPerson.setId(2L);
//        underTest.addPerson(person);
//        // When
//        when(personRepository.findById(id)).thenReturn(Optional.of(person));
//        underTest.updatePersonById(id, updatedPerson);
//
//        // Then
//        ArgumentCaptor<Person> personArgumentCaptor = ArgumentCaptor.forClass(Person.class);
//        verify(personRepository).save(personArgumentCaptor.capture());
//        Person capturedPerson = personArgumentCaptor.getValue();
//
//        assertThat(capturedPerson.getNameAndSurname()).isEqualTo(updatedPerson.getNameAndSurname());
//        assertThat(capturedPerson.getEmail()).isEqualTo(updatedPerson.getEmail());
//    }

    @Test
    void willThrowWhenTryingToUpdatePersonNotFound() {
        // Given
        Long id = 1L;
        Person updatedPerson = new Person("Updated Name", "updated@email.com");

        // When
        when(personRepository.findById(id)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> underTest.updatePersonById(id, updatedPerson))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Person with id " + id + " does not exist");

        verify(personRepository, never()).save(any());
    }

    @Test
    void canDeletePerson() {
        // Given
        Long id = 1L;

        // When
        underTest.deletePerson(id);

        // Then
        verify(personRepository).deleteById(id);
    }

    @Test
    void canGetPersonById() {
        // Given
        Long id = 1L;
        Person person = new Person("Test Name", "test@email.com");
        when(personRepository.findById(id)).thenReturn(Optional.of(person));

        // When
        Person actual = underTest.getPersonById(id);

        // Then
        assertThat(actual).usingRecursiveComparison().isEqualTo(person);
    }

    @Test
    void willThrowWhenGetPersonByIdReturnsEmptyOptional() {
        // Given
        Long id = 1L;

        // When
        when(personRepository.findById(id)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> underTest.getPersonById(id))
                .isInstanceOf(ResourceNotFoundException.class);
    }

}