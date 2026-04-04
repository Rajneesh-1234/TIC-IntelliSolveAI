package com.hackthone.payload.requestDTO;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CropRequestDTO {

    private String cropName;
    private Double quantity;
    private Double price;
    private String location;
}