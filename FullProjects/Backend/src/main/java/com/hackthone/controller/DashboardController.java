package com.hackthone.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackthone.payloadresponseDTO.DashboardResponseDTO;
import com.hackthone.service.DashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin("*")
public class DashboardController {

    private final DashboardService service;

    @GetMapping("/{farmerId}")
    public DashboardResponseDTO getDashboard(@PathVariable Long farmerId) {
        return service.getDashboard(farmerId);
    }
}
