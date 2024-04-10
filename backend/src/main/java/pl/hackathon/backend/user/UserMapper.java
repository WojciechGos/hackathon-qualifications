package pl.hackathon.backend.user;

import org.springframework.stereotype.Service;

@Service
public class UserMapper {

    public static UserDTO mapToUserDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getEmail(),
                user.getNameAndSurname(),
                user.getUserRole()
        );
    }


}
