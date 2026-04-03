package com.hackthone.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "govt_controls")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GovtControl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔗 Farmer
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "farmer_id", nullable = false)
    private FarmerProfile farmer;

    // 🎭 Action Type
    @NotNull(message = "Action type is required")
    @Enumerated(EnumType.STRING)
    private ActionType actionType;

    // 📝 Description
    @NotBlank(message = "Description is required")
    @Size(max = 500, message = "Description max 500 characters")
    private String description;

    // 📅 Created time
    private LocalDateTime createdAt;

    // 🔄 Auto timestamp
    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}