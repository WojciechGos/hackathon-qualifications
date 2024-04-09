package pl.hackathon.backend.person;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.validation.annotation.Validated;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@Validated
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
    @Email(message = "Incorrect email address format")
    @Pattern(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
    private String email;

}
