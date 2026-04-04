package com.hackthone.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackthone.entity.Review;

public interface ReviewRepository extends JpaRepository<Review,Long>{
	List<Review> findByFarmerId(Long farmerId);
}
