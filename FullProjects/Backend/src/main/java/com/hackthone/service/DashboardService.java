package com.hackthone.service;

import com.hackthone.payloadresponseDTO.DashboardResponseDTO;

public interface DashboardService {
	  DashboardResponseDTO getDashboard(Long farmerId);
}
