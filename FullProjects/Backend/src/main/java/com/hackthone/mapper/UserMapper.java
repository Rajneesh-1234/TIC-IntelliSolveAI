package com.hackthone.mapper;

import com.hackthone.entity.User;
import com.hackthone.payload.requestDTO.RegistrationRequest;
import com.hackthone.payloadresponseDTO.UserResponseDTO;

public class UserMapper {
    public static User toEntity(RegistrationRequest req) {
        User user = new User();
        user.setFullName(req.getFullName());
        user.setEmail(req.getEmail());
        user.setPhone(req.getPhone());
        user.setPassword(req.getPassword()); // hash before saving
        user.setState(req.getState());
        user.setDistrict(req.getDistrict());
        user.setAadhaar(req.getAadhaar());
        user.setRole(req.getRole());
        return user;
    }

    public static UserResponseDTO toResponse(User user) {
        UserResponseDTO dto = new UserResponseDTO();
        dto.setUserId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setMessage("User registered successfully.");
        return dto;
    }
}
