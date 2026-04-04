package com.hackthone.payloadresponseDTO;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BuyerResponseDTO {

    private Long id;
    private String name;
    private String location;
    private String crop;
    private Double price;
}