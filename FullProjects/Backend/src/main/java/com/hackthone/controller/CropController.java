package com.hackthone.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hackthone.payload.requestDTO.CropRequestDTO;
import com.hackthone.payloadresponseDTO.CropResponseDTO;
import com.hackthone.service.CropService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/crops")
@RequiredArgsConstructor
public class CropController {

    private final CropService cropService;

    // ✅ ADD CROP
    @PostMapping("/add")
    public ResponseEntity<CropResponseDTO> addCrop(
            @RequestBody CropRequestDTO requestDTO
    ) {
        return ResponseEntity.ok(cropService.addCrop(requestDTO));
    }

    // ✅ GET ALL CROPS
    @GetMapping
    public ResponseEntity<List<CropResponseDTO>> getAllCrops() {
        return ResponseEntity.ok(cropService.getAllCrops());
    }

    // ✅ DELETE CROP
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCrop(@PathVariable Long id) {
        cropService.deleteCrop(id);
        return ResponseEntity.ok("Crop deleted successfully");
    }
}