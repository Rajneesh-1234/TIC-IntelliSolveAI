package com.hackthone.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Table(name = "farmer_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FarmerProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔗 User relation (1-1)
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    // 🌾 Land Size (in acres)
    @NotNull(message = "Land size is required")
    @DecimalMin(value = "0.1", message = "Land size must be greater than 0")
    private Double landSize;

    // 📍 Address
    @NotBlank(message = "Address is required")
    private String address;

    // 🏙 District
    @NotBlank(message = "District is required")
    private String district;

    // 🌍 State
    @NotBlank(message = "State is required")
    private String state;

    // 📮 Pincode
    @Pattern(regexp = "^[1-9][0-9]{5}$", message = "Invalid pincode")
    private String pincode;

    // 🎓 Experience in years
    @Min(value = 0, message = "Experience cannot be negative")
    private Integer experienceYears;

    // 🧾 Description (UI profile bio)
    @Size(max = 500, message = "Description max 500 characters")
    private String description;

    // 🖼 Profile Image (VERY IMPORTANT for UI)
    @Column(name = "image_url")
    private String imageUrl;

    // 🗺 Map Location (UI map support)
    @DecimalMin(value = "-90.0", message = "Invalid latitude")
    @DecimalMax(value = "90.0", message = "Invalid latitude")
    private Double latitude;

    @DecimalMin(value = "-180.0", message = "Invalid longitude")
    @DecimalMax(value = "180.0", message = "Invalid longitude")
    private Double longitude;
}