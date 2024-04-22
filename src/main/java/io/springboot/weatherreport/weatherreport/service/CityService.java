package io.springboot.weatherreport.weatherreport.service;

import io.springboot.weatherreport.weatherreport.entity.City;
import io.springboot.weatherreport.weatherreport.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<City> getCity(final Integer id) {
        return repository.findById(id);
    }

}
