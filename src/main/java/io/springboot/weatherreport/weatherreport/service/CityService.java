package io.springboot.weatherreport.weatherreport.service;

import io.springboot.weatherreport.weatherreport.entity.City;
import io.springboot.weatherreport.weatherreport.exception.CityNotFoundException;
import io.springboot.weatherreport.weatherreport.repository.CityRepository;
import io.springboot.weatherreport.weatherreport.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;


@Service
public class CityService {

    private final CityRepository repository;

    @Autowired
    public CityService(final CityRepository repository) {
        this.repository = repository;
    }

    public Page<City> getAllCity(int pageNumber) {
        return repository.findAll(PageRequest.of(pageNumber, Constants.CITY_PAGE_SIZE));
    }

    public City getCity(final Integer id) throws CityNotFoundException {
        return repository.findById(id)
                .orElseThrow(() -> new CityNotFoundException(id));
    }

}
