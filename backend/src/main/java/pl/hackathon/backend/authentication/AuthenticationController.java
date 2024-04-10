package pl.hackathon.backend.authentication;

import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1")
public class AuthenticationController {

//    private final AuthenticationService authenticationService;
//
//    @PostMapping("/sign-in")
//    public ResponseEntity<String> signin(@RequestBody SignInRequest signInRequest) throws BadRequestException {
//        System.out.println(signInRequest.email());
//        String token = authenticationService.signin(signInRequest);
//        return new ResponseEntity<>(token, HttpStatus.OK);
//    }
//    @PostMapping("/sign-up")
//    public ResponseEntity<String> signup(@RequestBody SignUpRequest signUpRequest) throws BadRequestException {
//        System.out.println(signUpRequest.email());
//        String token = authenticationService.signup(signUpRequest);
//        return new ResponseEntity<>(token, HttpStatus.OK);
//    }
}
