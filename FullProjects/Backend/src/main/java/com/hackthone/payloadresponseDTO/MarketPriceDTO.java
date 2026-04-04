package com.hackthone.payloadresponseDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MarketPriceDTO {
    private String month;
    private double crop1;
    private double crop2;
}