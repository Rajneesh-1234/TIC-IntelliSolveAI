package com.hackthone.serviceImpl;

import java.time.LocalDateTime;
import java.util.Collection;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hackthone.configurations.JwtProvider;
import com.hackthone.domain.UserRole;
import com.hackthone.entity.User;
import com.hackthone.mapper.UserMapper;
import com.hackthone.payload.requestDTO.LoginRequest;
import com.hackthone.payload.requestDTO.RegistrationRequest;
import com.hackthone.payloadresponseDTO.AuthResponse;
import com.hackthone.repository.UserRepository;
import com.hackthone.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final CustomUserImplementation customUserImplementation;

    // ================= REGISTER =================
    @Override
    public AuthResponse register(RegistrationRequest request) {

        // 1. Email check
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // 2. Role validation (SECURITY)
        if (request.getRole() == UserRole.GOVERMENT) {
            throw new RuntimeException("Government role not allowed");
        }

        // 3. Map user
        User user = UserMapper.toEntity(request);

        // 🔥 DEFAULT ROLE (safe approach)
        user.setUserRole(UserRole.USER);

        // 4. Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // 5. Email verified (OTP removed)
        user.setEmailVerified(true);

        // 6. Save to DB
        userRepository.save(user);

        // 7. Generate JWT
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        user.getPassword()
                );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);

        return AuthResponse.builder()
                .token(token)
                .user(UserMapper.toResponse(user))
                .message("User registered successfully")
                .build();
    }
    // ================= AUTHENTICATE =================
    private Authentication authenticate(String email, String password) {

        UserDetails userDetails =
                customUserImplementation.loadUserByUsername(email);

        if (userDetails == null) {
            throw new RuntimeException("Email not found");
        }

        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new UsernamePasswordAuthenticationToken(
                email,
                null,
                userDetails.getAuthorities()
        );
    }

    // ================= LOGIN =================
    @Override
    public AuthResponse login(LoginRequest req) {

        Authentication authentication =
                authenticate(req.getEmail(), req.getPassword());

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        User user = userRepository.findByEmail(req.getEmail());
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);

        return AuthResponse.builder()
                .token(token)
                .user(UserMapper.toResponse(user))
                .message("Login successful")
                .build();
    }

    // ❌ OTP method remove kar diya ya optional bana sakta hai
    @Override
    public AuthResponse verifyOtp(String email, String otp) {
        throw new UnsupportedOperationException("OTP verification is disabled");
    }
}