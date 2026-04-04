package com.hackthone.payloadresponseDTO;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class OrderResponseDTO {

    private Long id;
    private String orderId;
    private String buyerName;
    private String cropName;
    private Integer quantity;
    private Double price;
    private Double total;
    private String status;
    private LocalDate orderDate;
    public OrderResponseDTO(String buyerName, String cropName, int quantity,
            int total, String status, String orderId) {
this.buyerName = buyerName;
this.cropName = cropName;
this.quantity = quantity;
this.total = (double) total;
this.status = status;
this.orderId = orderId;

this.id = null;
this.price = quantity != 0 ? this.total / quantity : 0.0;
this.orderDate = LocalDate.now();
}
}
