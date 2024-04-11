package pl.hackathon.backend.person;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.hackathon.backend.exception.ResourceNotFoundException;

@Service
@RequiredArgsConstructor
public class PersonService {
    private final PersonRepository personRepository;

    public Person getPersonById(Long id){
        return personRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Person with id " + id + " does not exist"));
    }

    public Person addPerson(Person person) {
        return personRepository.save(person);
    }

    public PersonDTO updatePersonById(Long id, Person person) {
        Person personToUpdate = getPersonById(id);

        if(person.getNameAndSurname() != null)
            personToUpdate.setNameAndSurname(person.getNameAndSurname());
        if(person.getEmail() != null)
            personToUpdate.setEmail(person.getEmail());

        return PersonMapper.mapToPersonDTO(personRepository.save(personToUpdate));
    }

    public void deletePerson(Long id) {
        personRepository.deleteById(id);
    }
}
