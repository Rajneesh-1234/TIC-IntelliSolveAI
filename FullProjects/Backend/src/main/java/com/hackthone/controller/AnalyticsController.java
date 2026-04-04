package com.hackthone.controller;

import com.hackthone.payloadresponseDTO.AnalyticsResponseDTO;
import com.hackthone.service.AnalyticsService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService service;

    // ✅ GET ANALYTICS BY FARMER ID
    @GetMapping("/{farmerId}")
    public AnalyticsResponseDTO getAnalytics(@PathVariable Long farmerId) {
        return service.getAnalytics(farmerId);
    }
}