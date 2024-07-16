package io.springboot.weatherreport.weatherreport.service;

import io.springboot.weatherreport.weatherreport.entity.City;
import io.springboot.weatherreport.weatherreport.exception.CityNotFoundException;
import io.springboot.weatherreport.weatherreport.repository.CityRepository;
import io.springboot.weatherreport.weatherreport.util.Constants;
import io.springboot.weatherreport.weatherreport.util.Utils;
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
                .orElseThrow(() -> new CityNotFoundException("City id" + id + "not found."));
    }

    public List<City> searchCity(String name, String stateId, int pageNumber) {
        // page number starting from 1
        pageNumber--;
        String input = Utils.normalizeSearchInput(name);
        if (input.isEmpty() && Utils.isEmptyOrNull(stateId)) {
            return getAllCity(pageNumber);
        }
        if (!input.isEmpty() && Utils.isEmptyOrNull(stateId)) {
            return repository.findByCity(input, PageRequest.of(pageNumber, Constants.CITY_PAGE_SIZE));
        }
        if (input.isEmpty() && !Utils.isEmptyOrNull(stateId)) {
            return repository.findByStateId(stateId, PageRequest.of(pageNumber, Constants.CITY_PAGE_SIZE));
        }
        return repository.findByCityAndStateId(input, stateId);
    }

    public long countSearchResult(String name, String stateId) {
        String input = Utils.normalizeSearchInput(name);
        if (input.isEmpty() && Utils.isEmptyOrNull(stateId)) {
            return repository.count();
        }
        if (!input.isEmpty() && Utils.isEmptyOrNull(stateId)) {
            return repository.countByCity(input);
        }
        if (input.isEmpty() && !Utils.isEmptyOrNull(stateId)) {
            return repository.countByStateId(stateId);
        }
        return repository.countByCityAndStateId(input, stateId);
    }

    public List<String> getCitySuggestions(String input) {
        if (input == null) return List.of();
//        if (repository.checkIfCityExist(input)) return List.of(input);
        return repository.findSimilarCityNames(input);
    }

}
