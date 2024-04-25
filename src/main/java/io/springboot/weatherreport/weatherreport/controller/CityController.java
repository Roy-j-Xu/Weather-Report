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
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


@Controller
@RequestMapping("/cities")
public class CityController {

    private final CityService cityService;

    @Autowired
    public CityController(final CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping
    public String list(
            @RequestParam(value = "page", defaultValue = "0") int pageNumber,
            final Model model
    ) {
        List<City> cityPage = cityService.getAllCity(pageNumber);

        model.addAttribute("cities", cityPage);
        return "index";
    }

    @GetMapping("/search")
    public String searchCity(
            @RequestParam(value = "name",  required = false) String cityNameWithUnderscore,
            @RequestParam(value = "state", required = false) String stateId,
            @RequestParam(value = "page", defaultValue = "0") int pageNumber,
            final Model model
    ) {
        String cityName = null;
        if (cityNameWithUnderscore != null) {
            cityName = cityNameWithUnderscore.replace("_", " ");
        }
        List<City> cities = cityService.searchCity(cityName, stateId, pageNumber);
        model.addAttribute("cities", cities);
        return "index";
    }

    @GetMapping("/{cityName},{stateId},{idString}")
    public String getCityByFullData(@PathVariable String idString, Model model) {
        City city;
        try {
            System.out.println(idString);
            int id = Integer.parseInt(idString);
            city = cityService.getCityById(id);
        } catch (CityNotFoundException exception) {
            model.addAttribute("error", exception.getMessage());
            return "city/city-not-found";
        }
        model.addAttribute("city", city);
        return "city/city";
    }

    @GetMapping("/{idString}")
    public String getCityById(@PathVariable String idString, Model model) {
        return getCityByFullData(idString, model);
    }

}
