package com.hackthone.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.hackthone.payload.requestDTO.OrderRequestDTO;
import com.hackthone.payloadresponseDTO.OrderResponseDTO;
import com.hackthone.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // ✅ CREATE ORDER
    @PostMapping("/add")
    public ResponseEntity<OrderResponseDTO> createOrder(
    	     @RequestBody OrderRequestDTO request
    	    ) {
    	        return ResponseEntity.ok(orderService.createOrder(request));
    	    }

    // ✅ GET ALL
    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.ok("Order deleted successfully");
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<OrderResponseDTO> updateOrderStatus(
            @PathVariable Long id,
            @RequestParam String status
    ) {
        return ResponseEntity.ok(orderService.updateStatus(id, status));
    }
    
}