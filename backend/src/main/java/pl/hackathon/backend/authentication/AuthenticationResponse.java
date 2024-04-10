package pl.hackathon.backend.authentication;

import pl.hackathon.backend.user.UserDTO;

public record AuthenticationResponse(
        String token,
        UserDTO user
) {
}
