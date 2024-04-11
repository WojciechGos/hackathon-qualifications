package pl.hackathon.backend.user;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {


    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void testGetUsers() {
        // Given
        List<User> users = List.of(new User(), new User());
        when(userRepository.findAll()).thenReturn(users);

        // When
        List<UserDTO> result = userService.getUsers();

        // Then
        assertEquals(users.size(), result.size());
        verify(userRepository).findAll();
    }

    @Test
    void testUpdateUser() {
        // Given
        Long id = 1L;
        String name = "Test Name";
        String email = "test@test.com";
        UserRole role = UserRole.ROLE_USER;
        UserDTO userDTO = new UserDTO(id, name, email, role);
        User user = new User();
        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);

        // When
        UserDTO result = userService.updateUser(id, userDTO);

        // Then
        assertNotNull(result);
        verify(userRepository).findById(id);
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testLoadUserByUsername() {
        // Given
        String email = "test@test.com";
        User user = new User();
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // When
        UserDetails result = userService.loadUserByUsername(email);

        // Then
        assertNotNull(result);
        verify(userRepository).findByEmail(email);
    }

    @Test
    void testDeleteUser() {
        // Given
        Long id = 1L;
        doNothing().when(userRepository).deleteById(id);

        // When
        userService.deleteUser(id);

        // Then
        verify(userRepository).deleteById(id);
    }

    @Test
    void testCreateUser() {
        // Given
        User user = new User();
        user.setPassword("password");
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        // When
        UserDTO result = userService.createUser(user);

        // Then
        assertNotNull(result);
        verify(passwordEncoder).encode(anyString());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void testGetUserById() {
        // Given
        Long id = 1L;
        User user = new User();
        when(userRepository.findById(id)).thenReturn(Optional.of(user));

        // When
        UserDTO result = userService.getUserById(id);

        // Then
        assertNotNull(result);
        verify(userRepository).findById(id);
    }

    @Test
    void testGetUserByEmail() {
        // Given
        String email = "test@test.com";
        User user = new User();
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

        // When
        User result = userService.getUserByEmail(email);

        // Then
        assertNotNull(result);
        verify(userRepository).findByEmail(email);
    }
}