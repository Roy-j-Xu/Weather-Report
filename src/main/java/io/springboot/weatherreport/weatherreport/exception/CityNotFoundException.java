package io.springboot.weatherreport.weatherreport.exception;

public class CityNotFoundException extends RuntimeException{
    public CityNotFoundException(int id) {
        super("Could not find city by id " + id);
    }
}
