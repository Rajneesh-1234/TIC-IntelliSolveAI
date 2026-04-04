package com.hackthone.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackthone.entity.Analytics;
import com.hackthone.payloadresponseDTO.AnalyticsResponseDTO;
import com.hackthone.payloadresponseDTO.CropDistributionDTO;
import com.hackthone.payloadresponseDTO.MonthlySalesDTO;
import com.hackthone.repository.AnalyticsRepository;
import com.hackthone.service.AnalyticsService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final AnalyticsRepository repo;
    private final ObjectMapper objectMapper = new ObjectMapper();


    // ✅ SAFE JSON PARSER
    private Map<String, Integer> parseJson(String json) {
        try {
            if (json == null || json.isEmpty()) {
                return new HashMap<>();
            }
            return objectMapper.readValue(json, new TypeReference<Map<String, Integer>>() {});
        } catch (Exception e) {
            return new HashMap<>();
        }
    }

	@Override
	public AnalyticsResponseDTO getAnalytics(Long farmerId) {

	    Analytics analytics = repo.findById(farmerId)
	            .orElseThrow(() -> new RuntimeException("Analytics not found"));

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

	    double totalSales = analytics.getTotalSales();

	    // ✅ AUTO CALCULATION
	    if (totalSales == 0) {
	        totalSales = monthlySales.stream()
	                .mapToDouble(MonthlySalesDTO::getSales)
	                .sum();
	    }

	    return AnalyticsResponseDTO.builder()
	            .id(analytics.getId())
	            .totalListings(analytics.getTotalListings())
	            .totalSales(totalSales)
	            .activeBuyers(analytics.getActiveBuyers())
	            .monthlySales(monthlySales)
	            .cropDistribution(cropDistribution)
	            .revenueByCrop(revenueByCrop)
	            .build();
	}
}