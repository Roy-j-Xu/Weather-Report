package io.springboot.weatherreport.weatherreport.exception;

import javax.naming.AuthenticationException;

public class UserAlreadyExistsException extends RuntimeException {
    public UserAlreadyExistsException(String msg) {
        super(msg);
    }
}
