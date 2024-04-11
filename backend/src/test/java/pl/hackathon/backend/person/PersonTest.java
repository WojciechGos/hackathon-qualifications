package pl.hackathon.backend.person;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Iterator;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class PersonTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }




    @Test
    void whenEmailIsNull_thenShouldHaveConstraintViolations() {
        // given
        Person person = new Person("test test", null);
        // when
        Set<ConstraintViolation<Person>> violations = validator.validate(person);
        // then
        assertEquals(1, violations.size());
        assertEquals("Email address must not be empty.", violations.iterator().next().getMessage());
    }

    @Test
    void whenNameAndSurnameAndEmailAreValid_thenShouldNotHaveConstraintViolations() {
        //given
        Person person = new Person("test test", "test@test.com");
        // when
        Set<ConstraintViolation<Person>> violations = validator.validate(person);
        // then
        assertTrue(violations.isEmpty());
    }
}