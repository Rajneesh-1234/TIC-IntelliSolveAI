package com.hackthone.service;

import java.util.List;

import com.hackthone.payload.requestDTO.OrderRequestDTO;
import com.hackthone.payloadresponseDTO.OrderResponseDTO;

public interface OrderService {

    OrderResponseDTO createOrder(OrderRequestDTO requestDTO);

    List<OrderResponseDTO> getAllOrders();
    OrderResponseDTO updateStatus(Long id, String status);
    void deleteOrder(Long id);
}