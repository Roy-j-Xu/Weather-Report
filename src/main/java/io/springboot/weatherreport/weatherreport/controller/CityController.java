package io.springboot.weatherreport.weatherreport.controller;


import io.springboot.weatherreport.weatherreport.entity.City;
import io.springboot.weatherreport.weatherreport.exception.CityNotFoundException;
import io.springboot.weatherreport.weatherreport.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/cities")
@CrossOrigin(origins = "http://localhost:1234")
public class CityController {

    private final CityService cityService;

    @Autowired
    public CityController(final CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping
    public List<City> searchCity(
            @RequestParam(value = "name",  required = false) String cityNameWithUnderscore,
            @RequestParam(value = "state", required = false) String stateId,
            @RequestParam(value = "page", defaultValue = "0") int pageNumber
    ) {
        String cityName = null;
        if (cityNameWithUnderscore != null) {
            cityName = cityNameWithUnderscore.replace("_", " ");
        }
        return cityService.searchCity(cityName, stateId, pageNumber);
    }

    @GetMapping("/{idString}")
    public City getCityById(@PathVariable String idString) throws CityNotFoundException {
        int id = Integer.parseInt(idString);
        return cityService.getCityById(id);
    }

    @GetMapping("/suggestions/{input}")
    public List<String> getCitySuggestions(@PathVariable String input) {
        return cityService.getCitySuggestions(input);
    }

}
