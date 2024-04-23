package io.springboot.weatherreport.weatherreport.controller;


import io.springboot.weatherreport.weatherreport.entity.City;
import io.springboot.weatherreport.weatherreport.exception.CityNotFoundException;
import io.springboot.weatherreport.weatherreport.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;

@Controller
@RequestMapping("/cities")
public class CityController {

    private final CityService cityService;

    @Autowired
    public CityController(final CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping
    public String list(Model model) {
        List<City> list = cityService.getAllCity();

        model.addAttribute("cities", list);
        return "index";
    }

    @GetMapping("/{cityName},{stateId},{id}")
    public String getCityById(@PathVariable int id, Model model) {
        City city;
        try {
            city = cityService.getCity(id);
        } catch (CityNotFoundException exception) {
            model.addAttribute("error", exception.getMessage());
            return "city-not-found";
        }
        model.addAttribute("city", city);
        return "city";
    }

//    @GetMapping("/{cityNameWithUnderscore},{stateId}")
//    public String getCity(
//            @PathVariable String cityNameWithUnderscore,
//            @PathVariable String stateId) {
//        String city_name = cityNameWithUnderscore.replace("_", " ");
//    }

}
