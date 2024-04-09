package pl.hackathon.backend.authentication;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class AuthenticationService {
//    private final AuthenticationManager authenticationManager;
//    public String signin(SignInRequest request) throws BadRequestException {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(
//                        request.email(),
//                        request.password()
//                )
//        );
//        final CustomUserDetails user = customUserDetailsService.loadUserByEmail(request.email());

//        if(user != null) {
//            return jwtUtil.issueToken(user.getEmail(), user.getAuthorities()
//                    .stream()
//                    .map(GrantedAuthority::getAuthority)
//                    .collect(Collectors.toList()));
//        }
//        throw new BadRequestException("Some error occurred in signing in.");
//    }

//    public String signup(SignUpRequest signUpRequest) {

//        CustomUserDetails user = new CustomUserDetails(signUpRequest.email(), signUpRequest.firstName(), signUpRequest.lastName(), signUpRequest.password());
//        customUserDetailsService.createUser(user);
//        return jwtUtil.issueToken(user.getEmail(), user.getAuthorities()
//                .stream()
//                .map(GrantedAuthority::getAuthority)
//                .collect(Collectors.toList()));
//    }
}
