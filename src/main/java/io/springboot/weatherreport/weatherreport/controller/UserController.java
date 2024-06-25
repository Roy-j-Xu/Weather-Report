package io.springboot.weatherreport.weatherreport.controller;

import io.springboot.weatherreport.weatherreport.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    public final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/like/{userIdStr},{cityIdStr}")
    public String likeCity(
            @PathVariable String userIdStr,
            @PathVariable String cityIdStr
    ) {
        long userId = Long.parseLong(userIdStr);
        int cityId = Integer.parseInt(cityIdStr);
        userService.likeCity(userId, cityId);
        return "Request successful.";
    }
}
