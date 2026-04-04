package com.hackthone.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hackthone.entity.Review;
import com.hackthone.mapper.ReviewMapper;
import com.hackthone.payload.requestDTO.ReviewRequestDTO;
import com.hackthone.payloadresponseDTO.ReviewResponseDTO;
import com.hackthone.repository.ReviewRepository;
import com.hackthone.service.ReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    public ReviewResponseDTO addReview(ReviewRequestDTO request) {

        Review review = ReviewMapper.toEntity(request);
        review.setReviewDate(LocalDate.now());

        return ReviewMapper.toDTO(
                reviewRepository.save(review)
        );
    }

    @Override
    public List<ReviewResponseDTO> getAllReviews() {
        return reviewRepository.findAll()
                .stream()
                .map(ReviewMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ReviewResponseDTO> getByFarmer(Long farmerId) {
        return reviewRepository.findByFarmerId(farmerId)
                .stream()
                .map(ReviewMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}