package pl.hackathon.backend.person;

public record PersonDTO(
        Long id,
        String nameAndSurname,
        String email
) {
}
