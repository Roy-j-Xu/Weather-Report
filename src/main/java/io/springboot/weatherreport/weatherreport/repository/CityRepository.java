package io.springboot.weatherreport.weatherreport.repository;

import io.springboot.weatherreport.weatherreport.entity.City;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface CityRepository extends JpaRepository<City, Integer> {

    Optional<City> findById(int id);

    List<City> findByCity(String city);

    long countByCity(String city);

    List<City> findByCity(String city, Pageable pageable);

    List<City> findByStateId(String stateId);

    long countByStateId(String stateId);

    List<City> findByStateId(String stateId, Pageable pageable);

    List<City> findByCityAndStateId(String city, String stateId);

    long countByCityAndStateId(String city, String stateId);

    @Query(value =
            "SELECT city FROM " +
            "(" +
                "SELECT DISTINCT city FROM cities " +
                "WHERE levenshtein(city, :input) < 5" +
            ") " +
            "ORDER BY levenshtein(city, :input) " +
            "LIMIT 5"
            ,
            nativeQuery = true)
    List<String> findSimilarCityNames(@Param("input") String input);

    @Query(value =
            "SELECT EXIST (SELECT 1 FROM cities WHERE city = :input) LIMIT 1",
            nativeQuery = true)
    boolean existsByCity(@Param("input") String input);

}
