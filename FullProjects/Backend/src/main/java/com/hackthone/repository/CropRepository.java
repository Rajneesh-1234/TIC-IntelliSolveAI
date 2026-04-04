package com.hackthone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hackthone.entity.Crop;

@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {
}