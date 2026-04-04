package com.hackthone.payloadresponseDTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RevenueDTO {
    private String month;
    private double amount;
}
