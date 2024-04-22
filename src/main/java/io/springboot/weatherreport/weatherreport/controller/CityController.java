package io.springboot.weatherreport.weatherreport.controller;


import io.springboot.weatherreport.weatherreport.entity.City;
import io.springboot.weatherreport.weatherreport.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/cities")
public class CityController {

    private final CityService service;

    @Autowired
    public CityController(final CityService service) {
        this.service = service;
    }

    @GetMapping
    public String list(Model model) {
        List<City> list = service.getAllCity();

        model.addAttribute("cities", list);
        return "index";
    }

}
