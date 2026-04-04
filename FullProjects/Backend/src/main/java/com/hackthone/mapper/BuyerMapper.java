package com.hackthone.mapper;

import com.hackthone.entity.Buyer;
import com.hackthone.payload.requestDTO.BuyerRequestDTO;
import com.hackthone.payloadresponseDTO.BuyerResponseDTO;

public class BuyerMapper {

    public static Buyer toEntity(BuyerRequestDTO dto) {
        return Buyer.builder()
                .name(dto.getName())
                .location(dto.getLocation())
                .crop(dto.getCrop())
                .price(dto.getPrice())
                .build();
    }

    public static BuyerResponseDTO toDTO(Buyer buyer) {
        return BuyerResponseDTO.builder()
                .id(buyer.getId())
                .name(buyer.getName())
                .location(buyer.getLocation())
                .crop(buyer.getCrop())
                .price(buyer.getPrice())
                .build();
    }
}
