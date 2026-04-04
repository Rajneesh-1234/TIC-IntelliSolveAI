package com.hackthone.payload.requestDTO;
import lombok.Data;

@Data
public class BuyerRequestDTO {

    private String name;
    private String location;
    private String crop;
    private Double price;
}