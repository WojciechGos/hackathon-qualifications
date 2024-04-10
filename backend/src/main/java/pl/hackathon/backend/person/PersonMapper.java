package pl.hackathon.backend.person;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
public class PersonMapper {

    public static PersonDTO mapToPersonDTO(Person person) {
        return new PersonDTO(person.getId(), person.getNameAndSurname(), person.getEmail());
    }

    public static Person mapToPerson(PersonDTO personDTO) {
        return new Person(personDTO.nameAndSurname(), personDTO.email());
    }

}
