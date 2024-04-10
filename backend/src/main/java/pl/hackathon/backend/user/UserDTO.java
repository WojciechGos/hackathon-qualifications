package pl.hackathon.backend.user;

public record UserDTO(
        Long id,
        String email,
        String nameAndSurname,
        UserRole role

) {
}
