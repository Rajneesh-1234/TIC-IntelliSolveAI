package com.hackthone.service;

import java.util.List;

import com.hackthone.payload.requestDTO.ReviewRequestDTO;
import com.hackthone.payloadresponseDTO.ReviewResponseDTO;

public interface ReviewService {

    ReviewResponseDTO addReview(ReviewRequestDTO request);

    List<ReviewResponseDTO> getAllReviews();

    List<ReviewResponseDTO> getByFarmer(Long farmerId);

    void deleteReview(Long id);
}