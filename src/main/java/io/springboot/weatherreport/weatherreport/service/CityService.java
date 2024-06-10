package io.springboot.weatherreport.weatherreport.service;

import io.springboot.weatherreport.weatherreport.entity.City;
import io.springboot.weatherreport.weatherreport.exception.CityNotFoundException;
import io.springboot.weatherreport.weatherreport.repository.CityRepository;
import io.springboot.weatherreport.weatherreport.util.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
public class CityService {

    private final CityRepository repository;

    @Autowired
    public CityService(CityRepository repository) {
        this.repository = repository;
    }

    public List<City> getAllCity(int pageNumber) {
        return repository.findAll(PageRequest.of(pageNumber, Constants.CITY_PAGE_SIZE)).getContent();
    }

    public City getCityById(int id) throws CityNotFoundException {
        return repository.findById(id)
                .orElseThrow(() -> new CityNotFoundException(id));
    }

    public List<City> searchCity(String name, String stateId, int pageNumber) {
        if (name == null && stateId == null) {
            return getAllCity(pageNumber);
        }
        if (name != null && stateId == null) {
            return repository.findByCity(name, PageRequest.of(pageNumber, Constants.CITY_PAGE_SIZE));
        }
        if (name == null && stateId != null) {
            return repository.findByStateId(stateId, PageRequest.of(pageNumber, Constants.CITY_PAGE_SIZE));
        }
        return repository.findByCityAndStateId(name, stateId);
    }

    public List<String> getCitySuggestions(String input) {
//        if (repository.checkIfCityExist(input)) return List.of(input);
        return repository.findSimilarCityNames(input);
    }

}
