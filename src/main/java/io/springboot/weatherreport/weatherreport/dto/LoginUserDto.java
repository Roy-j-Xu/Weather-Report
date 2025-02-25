package io.springboot.weatherreport.weatherreport.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginUserDto {
    @NotBlank
    private String username;
    @NotBlank
    private String password;
}
