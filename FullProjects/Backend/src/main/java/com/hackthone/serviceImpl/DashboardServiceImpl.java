package com.hackthone.serviceImpl;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.hackthone.payloadresponseDTO.DashboardResponseDTO;
import com.hackthone.payloadresponseDTO.ListingsDTO;
import com.hackthone.payloadresponseDTO.MarketPriceDTO;
import com.hackthone.payloadresponseDTO.OrderResponseDTO;
import com.hackthone.payloadresponseDTO.RevenueDTO;
import com.hackthone.service.DashboardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    @Override
    public DashboardResponseDTO getDashboard(Long farmerId) {

        // ✅ STATIC MOCK (later DB connect kar sakte ho)

        List<RevenueDTO> revenue = Arrays.asList(
                new RevenueDTO("Oct", 45000),
                new RevenueDTO("Nov", 52000),
                new RevenueDTO("Dec", 48000),
                new RevenueDTO("Jan", 60000),
                new RevenueDTO("Feb", 55000),
                new RevenueDTO("Mar", 72000)
        );

        List<MarketPriceDTO> market = Arrays.asList(
                new MarketPriceDTO("Oct", 40, 25),
                new MarketPriceDTO("Nov", 35, 28),
                new MarketPriceDTO("Dec", 30, 35),
                new MarketPriceDTO("Jan", 40, 40),
                new MarketPriceDTO("Feb", 50, 32),
                new MarketPriceDTO("Mar", 45, 30)
        );

        List<ListingsDTO> listings = Arrays.asList(
                new ListingsDTO("Organic Tomatoes", 500, 45, 128, 5),
                new ListingsDTO("Fresh Onions", 800, 30, 95, 3),
                new ListingsDTO("Basmati Rice", 2000, 85, 234, 8)
        );

        List<OrderResponseDTO> orders = Arrays.asList(
                new OrderResponseDTO("Krishna Traders", "Tomatoes", 100, 4500, "completed", "ORD-001"),
                new OrderResponseDTO("Patel Mills", "Rice", 500, 42500, "processing", "ORD-002"),
                new OrderResponseDTO("Green Mart", "Onions", 200, 6000, "pending", "ORD-003")
        );

        return DashboardResponseDTO.builder()
                .totalRevenue(333000)
                .activeListings(12)
                .pendingOrders(8)
                .avgPrice(52)
                .revenueOverview(revenue)
                .marketPrices(market)
                .activeListingsData(listings)
                .recentOrders(orders)
                .build();
    }
}