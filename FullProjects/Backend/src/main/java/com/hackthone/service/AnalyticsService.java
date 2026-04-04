package com.hackthone.service;

import com.hackthone.payloadresponseDTO.AnalyticsResponseDTO;

public interface AnalyticsService {

	AnalyticsResponseDTO getAnalytics(Long farmerId);

}