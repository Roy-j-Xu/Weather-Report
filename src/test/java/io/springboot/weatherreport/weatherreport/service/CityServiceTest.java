package io.springboot.weatherreport.weatherreport.service;

import io.springboot.weatherreport.weatherreport.repository.CityRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class CityServiceTest {

    @MockBean
    private CityRepository cityRepository;

    @Autowired
    private CityService cityService;

    @BeforeEach
    private void setup() {
    }


}
