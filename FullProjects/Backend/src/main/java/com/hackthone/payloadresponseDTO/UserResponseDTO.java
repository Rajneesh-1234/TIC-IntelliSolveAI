package com.hackthone.payloadresponseDTO;

import lombok.Data;

@Data
public class UserResponseDTO {
    Long userId;
    String fullName;
    String email;
    String message;
    // getters/setters...
}
