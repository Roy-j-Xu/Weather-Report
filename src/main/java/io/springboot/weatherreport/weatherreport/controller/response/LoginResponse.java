package io.springboot.weatherreport.weatherreport.controller.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private String token;
    private long expireTime;
}
