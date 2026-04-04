package com.hackthone.service;

import com.hackthone.payload.requestDTO.LoginRequest;
import com.hackthone.payload.requestDTO.RegistrationRequest;
import com.hackthone.payloadresponseDTO.AuthResponse;
public interface AuthService {
	
	 AuthResponse register(RegistrationRequest request);	
	 AuthResponse login(LoginRequest req);
	 AuthResponse verifyOtp(String email, String otp);
}
