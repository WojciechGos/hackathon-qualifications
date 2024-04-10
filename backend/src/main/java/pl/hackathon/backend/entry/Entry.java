package pl.hackathon.backend.entry;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import pl.hackathon.backend.person.Person;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Entry {
    @SequenceGenerator(
            name = "entry_sequence",
            sequenceName = "entry_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "entry_sequence"
    )
    private Long id;

    @Size(min = 1, max = 50, message = "Team name length must be between 1 and 50 characters")
    private String teamName;

    @Size(min=1, max = 255, message = "Team description length must be less than or equal to 255 characters")
    private String teamDescription;

    @Min(value = 1, message = "Participant number must be at least 1")
    @Max(value = 4, message = "Participant number must be at most 4")
    private int participantNumber;

    @OneToMany
    @Size(min = 1, max = 4, message = "Participant list must contain between 1 and 4 participants")
    private List<Person> participantList = new ArrayList<>();

    private EntryStatus status = EntryStatus.PENDING;

}
