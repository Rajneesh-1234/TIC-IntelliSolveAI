package com.hackthone.payloadresponseDTO;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ListingsDTO {

    private String cropName;
    private int quantity;
    private double price;
    private int views;
    private int offers;
}