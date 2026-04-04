package com.hackthone.mapper;

import com.hackthone.domain.OrderStatus;
import com.hackthone.entity.Order;
import com.hackthone.payload.requestDTO.OrderRequestDTO;
import com.hackthone.payloadresponseDTO.OrderResponseDTO;

import java.time.LocalDate;
import java.util.UUID;

public class OrderMapper {

    // DTO → Entity
    public static Order toEntity(OrderRequestDTO dto) {
        return Order.builder()
                .orderId("ORD-" + UUID.randomUUID().toString().substring(0, 5))
                .buyerName(dto.getBuyerName())
                .cropName(dto.getCropName())
                .quantity(dto.getQuantity())
                .price(dto.getPrice())
                .total(dto.getQuantity() * dto.getPrice())

                // ✅ FIX HERE
                .status(OrderStatus.PENDING)

                .orderDate(LocalDate.now())
                .build();
    }

    // Entity → DTO
    public static OrderResponseDTO toDTO(Order order) {
        return OrderResponseDTO.builder()
                .id(order.getId())
                .orderId(order.getOrderId())
                .buyerName(order.getBuyerName())
                .cropName(order.getCropName())
                .quantity(order.getQuantity())
                .price(order.getPrice())
                .total(order.getTotal())

                // ✅ ENUM → STRING (UI friendly)
                .status(order.getStatus().name())

                .orderDate(order.getOrderDate())
                .build();
    }
}