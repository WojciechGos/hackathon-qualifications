package pl.hackathon.backend.person;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.hackathon.backend.exception.BadRequestException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class PersonServiceTest {
    @Mock
    private PersonRepository personRepository;
    private PersonService underTest;

    @BeforeEach
    void setUp() {
        underTest = new PersonService(personRepository);
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

    @Test
    void updatePerson() {
        // Given
        Person initialPerson = new Person("Initial Name", "initial@email.com");
        Person updatedPerson = new Person("Updated Name", "updated@email.com");

        when(personRepository.findById(anyLong())).thenReturn(Optional.of(initialPerson));
        when(personRepository.save(any(Person.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // When
//        Person result = underTest.updatePerson(1L, updatedPerson);

        // Then
//        verify(personRepository).save(any(Person.class));
//        assertEquals(updatedPerson.getNameAndSurname(), result.getNameAndSurname());
//        assertEquals(updatedPerson.getEmail(), result.getEmail());
    }

    @Test
    void addPerson() {
        Person person = new Person("test test", "test@test.com");
    }


    @Test
    void deletePerson() {
    }
}