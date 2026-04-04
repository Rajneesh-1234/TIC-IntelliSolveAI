package com.hackthone.payload.requestDTO;

import com.hackthone.domain.UserRole;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
@Data
public class RegistrationRequest {
    @NotBlank String fullName;
    @Email @NotBlank String email;
    @NotBlank 
    String phone;
    @NotBlank 
    String password;
    @NotBlank
    String state;
    @NotBlank 
    String district;
    String aadhaar;  // optional
    @NotNull 
    UserRole role;
    // getters/setters...
}
