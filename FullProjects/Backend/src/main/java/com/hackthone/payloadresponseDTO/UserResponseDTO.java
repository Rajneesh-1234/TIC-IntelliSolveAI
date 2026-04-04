package com.hackthone.payloadresponseDTO;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponseDTO {

    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private String state;
    private String district;
    private String role;
}