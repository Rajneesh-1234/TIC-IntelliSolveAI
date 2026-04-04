package com.hackthone.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hackthone.payload.requestDTO.BuyerRequestDTO;
import com.hackthone.payloadresponseDTO.BuyerResponseDTO;
import com.hackthone.service.Buyerservice;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/buyers")
@RequiredArgsConstructor
public class BuyerController {

    private final Buyerservice buyerService;

    // ✅ ADD BUYER
    @PostMapping("/add")
    public ResponseEntity<BuyerResponseDTO> addBuyer(
            @RequestBody BuyerRequestDTO dto) {

        return ResponseEntity.ok(buyerService.addBuyer(dto));
    }

    // ✅ GET ALL BUYERS
    @GetMapping
    public ResponseEntity<List<BuyerResponseDTO>> getAllBuyers() {
        return ResponseEntity.ok(buyerService.getAllBuyers());
    }

    // ✅ DELETE BUYER
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBuyer(@PathVariable Long id) {
        buyerService.deleteBuyer(id);
        return ResponseEntity.ok("Buyer deleted successfully");
    }
}
