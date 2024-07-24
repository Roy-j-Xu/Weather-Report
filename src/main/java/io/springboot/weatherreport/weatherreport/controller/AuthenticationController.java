package io.springboot.weatherreport.weatherreport.controller;

import io.springboot.weatherreport.weatherreport.controller.response.LoginResponse;
import io.springboot.weatherreport.weatherreport.dto.LoginUserDto;
import io.springboot.weatherreport.weatherreport.dto.RegisterUserDto;
import io.springboot.weatherreport.weatherreport.entity.User;
import io.springboot.weatherreport.weatherreport.security.JwtService;
import io.springboot.weatherreport.weatherreport.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public User register(@RequestBody RegisterUserDto registerUserDto) {
        return authenticationService.signUp(registerUserDto);
    }

    @PostMapping("/login")
    public LoginResponse authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        return LoginResponse.builder()
                .token(jwtToken)
                .expireTime(jwtService.getExpirationTime())
                .build();
    }
}
