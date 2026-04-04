package com.hackthone.mapper;

import com.hackthone.entity.User;
import com.hackthone.payload.requestDTO.RegistrationRequest;
import com.hackthone.payloadresponseDTO.UserResponseDTO;

public class UserMapper {

    // 🔹 RegistrationRequest → User Entity
    public static User toEntity(RegistrationRequest req) {
        if (req == null) return null;

        return User.builder()
                .fullName(req.getFullName())
                .email(req.getEmail())
                .phoneNumber(req.getPhone())
                .state(req.getState())
                .district(req.getDistrict())
                .aadhaarNumber(req.getAadhaar())
                .password(req.getPassword()) // ⚠️ encode in service
                .role(req.getRole().name())
                .build();
    }

    // 🔹 User Entity → UserResponseDTO
    public static UserResponseDTO toDTO(User user) {
        if (user == null) return null;

        return UserResponseDTO.builder()
                .userId(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhoneNumber())
                .state(user.getState())
                .district(user.getDistrict())
                .role(user.getRole())
                .build();
    }
}