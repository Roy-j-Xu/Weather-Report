package io.springboot.weatherreport.weatherreport.service;

import io.springboot.weatherreport.weatherreport.dto.LoginUserDto;
import io.springboot.weatherreport.weatherreport.dto.RegisterUserDto;
import io.springboot.weatherreport.weatherreport.entity.User;
import io.springboot.weatherreport.weatherreport.exception.UserAlreadyExistsException;
import io.springboot.weatherreport.weatherreport.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final AuthenticationProvider authenticationProvider;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationProvider authenticationProvider,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.authenticationProvider = authenticationProvider;
        this.passwordEncoder = passwordEncoder;
    }

    public User signUp(RegisterUserDto input) throws UserAlreadyExistsException {
        String username = input.getUsername();
        userRepository.findByUsername(username).ifPresent(user -> {
            throw new UserAlreadyExistsException("User" + user.getUsername() + "already exists");
        });

        User user = User.builder()
                .username(username)
                .email(input.getEmail())
                .password( passwordEncoder.encode(input.getPassword()) )
                .build();
        userRepository.save(user);
        return user;
    }

    public User authenticate(LoginUserDto input) throws AuthenticationException {
        authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getUsername(),
                        input.getPassword()
                )
        );
        return userRepository.findByUsername(input.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException(""));
    }

}
