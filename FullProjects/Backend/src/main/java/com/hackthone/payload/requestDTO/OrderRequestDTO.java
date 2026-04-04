package com.hackthone.payload.requestDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequestDTO {

    private String buyerName;
    private String cropName;
    private Integer quantity;
    private Double price;
}