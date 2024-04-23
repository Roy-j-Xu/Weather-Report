package io.springboot.weatherreport.weatherreport.repository;

import io.springboot.weatherreport.weatherreport.entity.City;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CityRepository extends JpaRepository<City, Integer> {

    Optional<City> findById(int id);

    List<City> findByCity(String City);

    List<City> findByCity(String City, Pageable pageable);

    List<City> findByStateId(String stateId);

    List<City> findByStateId(String stateId, Pageable pageable);

    List<City> findByStateName(String stateName, Pageable pageable);

    List<City> findByCityAndStateId(String city, String stateId);

    List<City> findByCityAndStateName(String city, String stateName);



}
