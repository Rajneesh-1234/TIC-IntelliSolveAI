package com.hackthone.entity;

<<<<<<< HEAD
import java.time.LocalDateTime;

import com.hackthone.domain.UserRole;

import jakarta.persistence.*;
import lombok.*;

=======
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

>>>>>>> b80aa64351fdc49450015c1910e21e2ab9621206
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

<<<<<<< HEAD
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
=======
    // 👤 Full Name
    @NotBlank(message = "Name is required")
    @Size(min = 3, max = 50, message = "Name must be between 3 and 50 characters")
    @Column(nullable = false)
    private String name;

    // 📧 Email (Login ke liye use hoga)
    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    @Column(nullable = false, unique = true)
    private String email;

    // 🔐 Password
    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @Column(nullable = false)
    private String password;

    // 📱 Phone Number
    @NotBlank(message = "Phone number is required")
    @Pattern(
        regexp = "^[6-9]\\d{9}$",
        message = "Phone number must be valid (10 digits, starts with 6-9)"
    )
    @Column(nullable = false, unique = true)
    private String phone;

    // 🎭 Role (FARMER, SELLER, GOVERNMENT)
    @NotNull(message = "Role is required")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    // 🕒 Account creation time
    @Column(updatable = false)
    private LocalDateTime createdAt;

    // 🕒 Last update time
    private LocalDateTime updatedAt;

    // 🔄 Auto timestamps
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
>>>>>>> b80aa64351fdc49450015c1910e21e2ab9621206
}