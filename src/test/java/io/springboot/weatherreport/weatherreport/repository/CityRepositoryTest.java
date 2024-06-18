package io.springboot.weatherreport.weatherreport.repository;

import io.springboot.weatherreport.weatherreport.entity.City;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;
import java.util.Optional;

@DataJpaTest
// Reset application context after each test to properly reset database
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
// Use H2 database instead of database with real data
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class CityRepositoryTest {

    @Autowired
    private CityRepository cityRepository;

    @BeforeEach
    public void setUp() {
        String[] stringData = {
                "New York,NY,New York,40.6943,-73.9249,America/New_York",
                "Los Angeles,CA,California,34.1141,-118.4068,America/Los_Angeles",
                "Chicago,IL,Illinois,41.8375,-87.6866,America/Chicago",
                "Twin Lakes,CA,California,36.9646,-121.9896,America/Los_Angeles",
                "Franklin,IN,Indiana,39.4948,-86.0544,America/Indiana/Indianapolis",
                "North Lynbrook,NY,New York,40.6685,-73.6736,America/New_York",
                "Twin Lakes,MN,Minnesota,47.2261,-95.6555,America/Chicago",
                "Twin Lakes,CA,California,38.1695,-119.3422,America/Los_Angeles"
        };
        for (String line : stringData) {
            cityRepository.save(stringToCity(line));
        }
    }

    @Test
    public void findById_ReturnCorrectCity() {
        Optional<City> city = cityRepository.findById(2);

        Assertions.assertTrue(city.isPresent());
        Assertions.assertEquals(city.get().getCity(), "Los Angeles");
    }

    @Test
    public void findAll_ReturnAllCities() {
        List<City> cities = cityRepository.findAll();
        Assertions.assertEquals(8, cities.size());
    }

    @Test
    public void findByStateId_returnCorrectCities() {
        List<City> citiesIn = cityRepository.findByStateId("IN");
        List<City> citiesNy = cityRepository.findByStateId("NY");
        List<City> citiesCa = cityRepository.findByStateId("CA");

        Assertions.assertEquals(1, citiesIn.size());
        Assertions.assertEquals(2, citiesNy.size());
        Assertions.assertEquals(3, citiesCa.size());
    }

    @Test
    public void findByCity_returnCorrectCities() {
        List<City> twinLakes = cityRepository.findByCity("Twin Lakes");
        Assertions.assertEquals(3, twinLakes.size());
    }

    @Test
    public void findByCityAndStateId_returnCorrectCities() {
        List<City> twinLakesMn = cityRepository.findByCityAndStateId("Twin Lakes", "MN");
        List<City> twinLakesCa = cityRepository.findByCityAndStateId("Twin Lakes", "CA");

        Assertions.assertEquals(1, twinLakesMn.size());
        Assertions.assertEquals(2, twinLakesCa.size());
    }


    // Helper function
    private City stringToCity(String line) {
        String[] data = line.split(",");
        float lat = Float.parseFloat(data[3]);
        float lng = Float.parseFloat(data[4]);
        return City.builder()
                .city(data[0])
                .stateId(data[1])
                .stateName(data[2])
                .lat(lat)
                .lng(lng)
                .timezone(data[5])
                .build();
    }
}
