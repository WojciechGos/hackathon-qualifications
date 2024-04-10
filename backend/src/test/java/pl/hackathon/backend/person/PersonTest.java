package pl.hackathon.backend.person;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

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
    void whenNameAndSurnameIsBlank_thenShouldHaveConstraintViolations() {
        Person person = new Person("", "test@test.com");
        Set<ConstraintViolation<Person>> violations = validator.validate(person);
        assertEquals(1, violations.size());
        assertEquals("First and last name must not be blank.", violations.iterator().next().getMessage());
    }

    @Test
    void whenEmailIsInvalid_thenShouldHaveConstraintViolations() {
        Person person = new Person("test test", "invalidEmail");
        Set<ConstraintViolation<Person>> violations = validator.validate(person);
        System.out.println(violations.toString());
        assertEquals(1, violations.size());
        assertEquals("Incorrect email address format", violations.iterator().next().getMessage());
    }
}