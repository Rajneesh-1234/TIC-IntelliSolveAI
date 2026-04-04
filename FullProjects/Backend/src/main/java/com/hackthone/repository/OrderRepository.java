package com.hackthone.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.hackthone.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}