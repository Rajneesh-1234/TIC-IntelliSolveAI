package com.hackthone.entity;

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

    private String fullName;

    @Column(unique = true)
    private String email;
    
    @Column(name = "email_verified")
    private boolean emailVerified = true;
    
    @Column(name = "phone")
    private String phoneNumber;

    private String state;

    private String district;

    private String aadhaarNumber;

    private String password;

    private String role; // USER / ADMIN / FARMER
}