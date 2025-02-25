package io.springboot.weatherreport.weatherreport.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class CityNotFoundException extends RuntimeException{
    public CityNotFoundException(String msg) {
        super(msg);
    }
}
