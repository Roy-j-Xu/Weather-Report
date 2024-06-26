package io.springboot.weatherreport.weatherreport.controller;

import io.springboot.weatherreport.weatherreport.entity.City;
import io.springboot.weatherreport.weatherreport.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    public final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/like/{username},{cityIdStr}")
    public String likeCity(
            @PathVariable String username,
            @PathVariable String cityIdStr
    ) {
        int cityId = Integer.parseInt(cityIdStr);
        userService.likeCity(username, cityId);
        return "Request successful.";
    }

    @GetMapping("like/{username}")
    public List<City> getLikedCitiesByUsername(@PathVariable String username) {
        return userService.getLikedCitiesByUsername(username);
    }
}
