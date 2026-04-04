package com.hackthone.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reviewerName;   // Amit Singh
    private int rating;            // 1–5
    private String comment;

    private LocalDate reviewDate;

    // Optional (future use)
    private Long buyerId;
    private Long farmerId;
}