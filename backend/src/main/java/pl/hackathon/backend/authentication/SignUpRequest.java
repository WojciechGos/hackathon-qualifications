package pl.hackathon.backend.authentication;
public record SignUpRequest(
        String email,
        String password,
        String firstName,
        String lastName) {
}
