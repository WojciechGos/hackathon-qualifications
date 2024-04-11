package pl.hackathon.backend.person;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.springframework.validation.annotation.Validated;
import pl.hackathon.backend.entry.Entry;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@Validated
@Inheritance(strategy = InheritanceType.JOINED)
public class Person {
    @SequenceGenerator(
            name = "person_sequence",
            sequenceName = "person_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "person_sequence"
    )
    private Long id;

    @NotBlank(message = "First and last name must not be blank.")
    @NotNull(message = "First and last name must not be null.")
    private String nameAndSurname;

    @NotBlank(message = "Email address must not be empty.")
    @Pattern(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Incorrect email address format.")
    private String email;

    public Person(String nameAndSurname, String email) {
        this.nameAndSurname = nameAndSurname;
        this.email = email;
    }
}
