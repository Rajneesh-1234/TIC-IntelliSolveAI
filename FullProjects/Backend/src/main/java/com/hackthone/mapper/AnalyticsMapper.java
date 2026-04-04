package com.hackthone.mapper;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackthone.entity.Analytics;
import com.hackthone.payload.requestDTO.AnalyticsRequestDTO;
import com.hackthone.payloadresponseDTO.*;

import java.util.*;
import java.util.stream.Collectors;

public class AnalyticsMapper {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    // ✅ REQUEST → ENTITY
    public static Analytics toEntity(AnalyticsRequestDTO dto) {
        return Analytics.builder()
                .totalListings(dto.getTotalListings())
                .totalSales(dto.getTotalSales())
                .activeBuyers(dto.getActiveBuyers())
                .monthlySales(dto.getMonthlySales()) // JSON String
                .cropDistribution(dto.getCropDistribution())
                .revenueByCrop(dto.getRevenueByCrop())
                .build();
    }

    // ✅ ENTITY → RESPONSE (FIXED)
    public static AnalyticsResponseDTO toDTO(Analytics analytics) {

        Map<String, Integer> monthlyMap = parseJson(analytics.getMonthlySales());
        Map<String, Integer> cropMap = parseJson(analytics.getCropDistribution());
        Map<String, Integer> revenueMap = parseJson(analytics.getRevenueByCrop());

        List<MonthlySalesDTO> monthlySales = monthlyMap.entrySet()
                .stream()
                .map(e -> new MonthlySalesDTO(e.getKey(), e.getValue()))
                .collect(Collectors.toList());

        List<CropDistributionDTO> cropDistribution = cropMap.entrySet()
                .stream()
                .map(e -> new CropDistributionDTO(e.getKey(), e.getValue()))
                .collect(Collectors.toList());

        List<CropDistributionDTO> revenueByCrop = revenueMap.entrySet()
                .stream()
                .map(e -> new CropDistributionDTO(e.getKey(), e.getValue()))
                .collect(Collectors.toList());

        return AnalyticsResponseDTO.builder()
                .id(analytics.getId())
                .totalListings(analytics.getTotalListings())
                .totalSales(analytics.getTotalSales())
                .activeBuyers(analytics.getActiveBuyers())
                .monthlySales(monthlySales)          // ✅ FIXED
                .cropDistribution(cropDistribution)  // ✅ FIXED
                .revenueByCrop(revenueByCrop)        // ✅ FIXED
                .build();
    }

    // ✅ COMMON JSON PARSER
    private static Map<String, Integer> parseJson(String json) {
        try {
            if (json == null || json.isEmpty()) {
                return new HashMap<>();
            }
            return objectMapper.readValue(json, new TypeReference<Map<String, Integer>>() {});
        } catch (Exception e) {
            return new HashMap<>();
        }
    }
}