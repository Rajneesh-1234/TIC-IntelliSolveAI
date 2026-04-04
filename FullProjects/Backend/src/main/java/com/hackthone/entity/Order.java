package com.hackthone.entity;

import java.time.LocalDate;

import com.hackthone.domain.OrderStatus;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "orders")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String orderId; // ORD-001

    private String buyerName;

    private String cropName;

    private Integer quantity;

    private Double price; // per kg

    private Double total;

    // ✅ ONLY ENUM (STRING hata diya)
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private LocalDate orderDate;
}