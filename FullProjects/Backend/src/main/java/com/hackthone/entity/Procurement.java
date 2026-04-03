package com.hackthone.entity;



import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "procurements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Procurement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔗 Crop
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    // 🔗 Farmer
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private FarmerProfile farmer;

    // 📦 Quantity
    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "0.1", message = "Quantity must be greater than 0")
    private Double quantity;

    // 💰 Price offered by Govt
    @NotNull(message = "Price is required")
    @DecimalMin(value = "1.0", message = "Price must be greater than 0")
    private Double price;

    // 📊 Status
    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    private ProcurementStatus status;

    // 📅 Request date
    private LocalDateTime requestDate;

    // 📅 Updated time
    private LocalDateTime updatedAt;

    // 🔄 Auto timestamps
    @PrePersist
    protected void onCreate() {
        this.requestDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}