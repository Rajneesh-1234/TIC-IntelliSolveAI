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

import com.hackthone.payload.requestDTO.ReviewRequestDTO;
import com.hackthone.payloadresponseDTO.ReviewResponseDTO;
import com.hackthone.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    // ✅ ADD REVIEW
    @PostMapping
    public ResponseEntity<ReviewResponseDTO> addReview(
            @RequestBody ReviewRequestDTO request
    ) {
        return ResponseEntity.ok(reviewService.addReview(request));
    }

    // ✅ GET ALL
    @GetMapping
    public ResponseEntity<List<ReviewResponseDTO>> getAll() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }

    // ✅ GET BY FARMER
    @GetMapping("/farmer/{id}")
    public ResponseEntity<List<ReviewResponseDTO>> getByFarmer(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(reviewService.getByFarmer(id));
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok("Deleted Successfully");
    }
}