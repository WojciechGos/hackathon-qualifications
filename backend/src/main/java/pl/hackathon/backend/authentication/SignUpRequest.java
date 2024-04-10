package pl.hackathon.backend.authentication;
public record SignUpRequest(
        String email,
        String nameAndSurname,
        String password
) {
}
