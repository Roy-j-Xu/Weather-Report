package io.springboot.weatherreport.weatherreport.service;

import io.springboot.weatherreport.weatherreport.security.JwtService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public class JwtServiceTest {
    private final String secretKey = "3cfa76ef14937c1c0ea519f8fc057a80fcd04a7420f8e8bcd0a7567c272e007b";
    private final long expiredTime = 100000000;
    private final JwtService jwtService = new JwtService(secretKey, expiredTime);

    @Test
    public void JwtService_generateTokenTest() {
        UserDetails userDetail = new User("user_name", "1234567", List.of(new SimpleGrantedAuthority("USER")));
        String token = jwtService.generateToken(userDetail);
        System.out.println(token);
        Assertions.assertEquals("user_name", jwtService.extractUsername(token), "");
    }

}
