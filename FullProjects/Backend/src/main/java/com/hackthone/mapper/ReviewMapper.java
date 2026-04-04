package com.hackthone.mapper;

import java.time.LocalDate;

import com.hackthone.entity.Review;
import com.hackthone.payload.requestDTO.ReviewRequestDTO;
import com.hackthone.payloadresponseDTO.ReviewResponseDTO;

public class ReviewMapper {

    public static Review toEntity(ReviewRequestDTO dto) {
        return Review.builder()
                .reviewerName(dto.getReviewerName())
                .rating(dto.getRating())
                .comment(dto.getComment())
                .reviewDate(LocalDate.now()) // auto set
                .buyerId(dto.getBuyerId())
                .farmerId(dto.getFarmerId())
                .build();
    }

    public static ReviewResponseDTO toDTO(Review review) {
        return ReviewResponseDTO.builder()
                .id(review.getId())
                .reviewerName(review.getReviewerName())
                .rating(review.getRating())
                .comment(review.getComment())
                .reviewDate(review.getReviewDate())
                .build();
    }
}
