package com.hackthone.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hackthone.entity.Buyer;

public interface BuyerRepository extends JpaRepository<Buyer, Long> {
}