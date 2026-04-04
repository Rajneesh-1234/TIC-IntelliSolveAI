package com.hackthone.payloadresponseDTO;

import java.util.List;

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
public class DashboardResponseDTO {

    private double totalRevenue;
    private int activeListings;
    private int pendingOrders;
    private double avgPrice;

    private List<RevenueDTO> revenueOverview;
    private List<MarketPriceDTO> marketPrices;

    private List<ListingsDTO> activeListingsData;
    private List<OrderResponseDTO> recentOrders;
}