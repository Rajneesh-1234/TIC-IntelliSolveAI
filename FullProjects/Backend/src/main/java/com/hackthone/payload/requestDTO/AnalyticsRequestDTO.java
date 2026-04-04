package com.hackthone.payload.requestDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsRequestDTO {

    private int totalListings;
    private double totalSales;
    private int activeBuyers;

    private String monthlySales;
    private String cropDistribution;
    private String revenueByCrop;
}