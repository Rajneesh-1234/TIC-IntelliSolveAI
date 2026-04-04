package com.hackthone.controller;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hackthone.payload.requestDTO.LoginRequest;
import com.hackthone.payload.requestDTO.RegistrationRequest;
import com.hackthone.payloadresponseDTO.AuthResponse;
import com.hackthone.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // ================= REGISTER =================
    @PostMapping("/register")
    public ResponseEntity<?> register(
            @Valid @RequestBody RegistrationRequest request) {

        return ResponseEntity.ok(authService.register(request));
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    // ❌ OPTIONAL (OTP disabled hai toh hata bhi sakta hai)
    @PostMapping("/verify-otp")
    public ResponseEntity<AuthResponse> verifyOtp(
            @RequestParam String email,
            @RequestParam String otp) {

        AuthResponse response = authService.verifyOtp(email, otp);
        return ResponseEntity.ok(response);
    }
}