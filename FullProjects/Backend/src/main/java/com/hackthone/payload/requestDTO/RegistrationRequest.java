package com.hackthone.payload.requestDTO;

import com.hackthone.domain.UserRole;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegistrationRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^[6-9][0-9]{9}$",
        message = "Enter valid Indian phone number"
    )
    private String phone;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    @NotBlank(message = "State is required")
    private String state;

    @NotBlank(message = "District is required")
    private String district;

    @Pattern(regexp = "^[0-9]{12}$", message = "Aadhaar must be 12 digits")
    private String aadhaar;  // optional but validated if present

    @NotNull(message = "Role is required")
    private UserRole role;
}