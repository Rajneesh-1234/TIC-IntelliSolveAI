package com.hackthone.entity;

import java.time.LocalDateTime;

import com.hackthone.domain.UserRole;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String password; // hashed password

    @Column(nullable = false)
    private String state;

    @Column(nullable = false)
    private String district;

    @Column(nullable = true)
    private String aadhaar;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

    // 🔥 Extra useful fields
    private boolean emailVerified = true; // since OTP removed

    private LocalDateTime createdAt;

    private LocalDateTime lastLogin;

    // 🔥 Auto timestamps
    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDateTime.now();
    }
}