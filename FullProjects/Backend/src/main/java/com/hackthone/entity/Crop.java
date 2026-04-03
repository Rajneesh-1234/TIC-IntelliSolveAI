package com.hackthone.entity;



import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "crops")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Crop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🌾 Crop Name
    @NotBlank(message = "Crop name is required")
    @Size(min = 2, max = 50, message = "Crop name must be between 2 and 50 characters")
    @Column(nullable = false)
    private String name;

    // 🏷 Category (Wheat, Rice, Fruits etc.)
    @NotBlank(message = "Category is required")
    private String category;

    // 📦 Quantity Available
    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "0.1", message = "Quantity must be greater than 0")
    private Double quantity;

    // 💰 Price per unit (kg/quintal)
    @NotNull(message = "Price is required")
    @DecimalMin(value = "1.0", message = "Price must be greater than 0")
    private Double pricePerUnit;

    // 📅 Harvest Date
    @NotNull(message = "Harvest date is required")
    private LocalDate harvestDate;

    // 🖼 Crop Image (UI ke liye important)
    @Column(name = "image_url")
    private String imageUrl;

    // 📝 Description
    @Size(max = 500, message = "Description cannot exceed 500 characters")
    private String description;

    // 🔗 Relation with FarmerProfile
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private FarmerProfile farmer;

    // 🕒 Created Time
    private LocalDate createdAt;

    // 🕒 Updated Time
    private LocalDate updatedAt;

    // 🔄 Auto timestamps
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDate.now();
    }
}
