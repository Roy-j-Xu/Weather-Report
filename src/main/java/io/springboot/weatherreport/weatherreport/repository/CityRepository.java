package io.springboot.weatherreport.weatherreport.repository;

import io.springboot.weatherreport.weatherreport.entity.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City, Integer> {
}
