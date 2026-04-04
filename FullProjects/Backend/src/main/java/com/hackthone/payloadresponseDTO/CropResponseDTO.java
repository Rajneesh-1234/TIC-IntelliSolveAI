package com.hackthone.payloadresponseDTO;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CropResponseDTO {

    private Long id;
    private String cropName;
    private Double quantity;
    private Double price;
    private String location;
}