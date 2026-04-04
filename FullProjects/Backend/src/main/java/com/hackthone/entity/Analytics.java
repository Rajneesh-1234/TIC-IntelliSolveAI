package com.hackthone.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Analytics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int totalListings;
    private double totalSales;
    private int activeBuyers;

    // monthly sales (JSON string or separate table optional)
    private String monthlySales; 
    // example: {"Jan":12000,"Feb":18000}

    private String cropDistribution;
    // example: {"Wheat":300,"Rice":200}

    private String revenueByCrop;
    // example: {"Wheat":400,"Rice":300}
}