package pl.hackathon.backend.person;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/persons")
@RequiredArgsConstructor
public class PersonController {
    private final PersonService personService;

    @PatchMapping("/{id}")
    public ResponseEntity<PersonDTO> updatePerson(@PathVariable Long id, @RequestBody Person person) {
        return new ResponseEntity<>(personService.updatePersonById(id, person), HttpStatus.OK);
    }

}
