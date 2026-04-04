package com.hackthone.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hackthone.domain.OrderStatus;
import com.hackthone.entity.Order;
import com.hackthone.mapper.OrderMapper;
import com.hackthone.payload.requestDTO.OrderRequestDTO;
import com.hackthone.payloadresponseDTO.OrderResponseDTO;
import com.hackthone.repository.OrderRepository;
import com.hackthone.service.OrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    // ✅ CREATE ORDER
    @Override
    public OrderResponseDTO createOrder(OrderRequestDTO requestDTO) {

        Order order = OrderMapper.toEntity(requestDTO);

        // Enum fix
        order.setStatus(OrderStatus.PENDING);

        Order saved = orderRepository.save(order);

        return OrderMapper.toDTO(saved);
    }

    // ✅ GET ALL ORDERS
    @Override
    public List<OrderResponseDTO> getAllOrders() {
        return orderRepository.findAll()
                .stream()
                .map(OrderMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponseDTO updateStatus(Long id, String status) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(OrderStatus.valueOf(status.toUpperCase()));

        Order updated = orderRepository.save(order);

        return OrderMapper.toDTO(updated);
    }
    // ✅ DELETE ORDER
    @Override
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}