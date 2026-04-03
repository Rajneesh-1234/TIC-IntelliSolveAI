package com.hackthone.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔗 Crop Relation
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crop_id", nullable = false)
    private Crop crop;

    // 🔗 Farmer (Crop owner)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private FarmerProfile farmer;

    // 🔗 Seller (User)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    // 📦 Quantity ordered
    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "0.1", message = "Quantity must be greater than 0")
    private Double quantity;

    // 💰 Total price (auto calculated)
    @NotNull(message = "Total price is required")
    @DecimalMin(value = "1.0", message = "Total price must be greater than 0")
    private Double totalPrice;

    // 📊 Order Status
    @NotNull(message = "Order status is required")
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    // 📅 Order placed time
    private LocalDateTime orderDate;

    // 📅 Last updated time
    private LocalDateTime updatedAt;

    // 🔄 Auto timestamps
    @PrePersist
    protected void onCreate() {
        this.orderDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}