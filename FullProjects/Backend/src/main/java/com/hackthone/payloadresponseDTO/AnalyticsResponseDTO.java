package com.hackthone.payloadresponseDTO;

import lombok.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsResponseDTO {

    private Long id;

    private int totalListings;
    private double totalSales;
    private int activeBuyers;

    // ✅ CHANGE HERE
    private List<MonthlySalesDTO> monthlySales;
    private List<CropDistributionDTO> cropDistribution;
    private List<CropDistributionDTO> revenueByCrop;
}