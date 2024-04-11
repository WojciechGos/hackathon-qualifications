package pl.hackathon.backend.authentication;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;
import pl.hackathon.backend.jwt.JWTUtil;
import pl.hackathon.backend.user.*;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JWTUtil jwtUtil;

    public AuthenticationResponse signin(SignInRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );
        User principal = (User) authentication.getPrincipal();
        UserDTO userDTO = new UserDTO(
                principal.getId(),
                principal.getNameAndSurname(),
                principal.getEmail(),
                principal.getUserRole()
        );

        String token = jwtUtil.issueToken(
                principal.getEmail(),
                principal.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()));
        return new AuthenticationResponse(token, userDTO);
    }

    public AuthenticationResponse signup(SignUpRequest signUpRequest) {

        System.out.println(signUpRequest.email());
        User user = new User(signUpRequest.email(), signUpRequest.nameAndSurname(), signUpRequest.password(), UserRole.ROLE_USER);

        UserDTO userDTO = UserMapper.mapToUserDTO(user);

        userService.createUser(user);

        String token = jwtUtil.issueToken(user.getEmail(), user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));

        return new AuthenticationResponse(token, userDTO);
    }
}
