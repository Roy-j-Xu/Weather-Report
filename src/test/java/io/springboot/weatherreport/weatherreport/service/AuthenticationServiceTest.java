package io.springboot.weatherreport.weatherreport.service;

import io.springboot.weatherreport.weatherreport.dto.UserLoginDto;
import io.springboot.weatherreport.weatherreport.dto.UserRegisterDto;
import io.springboot.weatherreport.weatherreport.entity.User;
import io.springboot.weatherreport.weatherreport.exception.UserAlreadyExistsException;
import io.springboot.weatherreport.weatherreport.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;
import static org.mockito.Mockito.when;

@SpringBootTest
@RunWith(SpringRunner.class)
public class AuthenticationServiceTest {
    @MockBean
    private PasswordEncoder passwordEncoder;
    @MockBean
    private UserRepository userRepository;
    @MockBean
    private AuthenticationProvider authenticationProvider;
    @Autowired
    private AuthenticationService authenticationService;

    private final String username = "username";
    private final String email = "email";
    private final String password = "password";
    private final String encodedPassword = "encoded password";
    private final User user = User.builder()
            .username(username)
            .email(email)
            .password(encodedPassword)
            .build();
    private final UserRegisterDto registerInput = UserRegisterDto.builder()
            .username(username)
            .email(email)
            .password(password)
            .build();

    @Before
    public void setUp() {
        when(passwordEncoder.encode(password)).thenReturn(encodedPassword);
    }

    @Test
    public void signUp_ThrowException_WhenUserExists() {
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

        assertThrows(UserAlreadyExistsException.class, () -> {
            authenticationService.signUp(registerInput);
        });
    }

    @Test
    public void signUp_SaveCorrectUser_WhenUserDoesNotExist() {
        assertEquals(authenticationService.signUp(registerInput), user);
    }

    @Test
    public void authenticate_ReturnCorrectUser_WhenUsersInputIsCorrect() {
        UserLoginDto correctLoginInput = UserLoginDto.builder()
                .username(username)
                .password(password)
                .build();
        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        ))
        .thenReturn(null);

        assertEquals(authenticationService.authenticate(correctLoginInput), user);
    }

}
