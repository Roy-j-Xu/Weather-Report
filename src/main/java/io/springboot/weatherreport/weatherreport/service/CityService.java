package io.springboot.weatherreport.weatherreport.service;

import io.springboot.weatherreport.weatherreport.entity.City;
import io.springboot.weatherreport.weatherreport.exception.CityNotFoundException;
import io.springboot.weatherreport.weatherreport.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityService {

    private final CityRepository repository;

    @Autowired
    public CityService(final CityRepository repository) {
        this.repository = repository;
    }

    public List<City> getAllCity() {
        return repository.findAll();
    }

    public City getCity(final Integer id) throws CityNotFoundException {
        return repository.findById(id)
                .orElseThrow(() -> new CityNotFoundException(id));
    }

}
