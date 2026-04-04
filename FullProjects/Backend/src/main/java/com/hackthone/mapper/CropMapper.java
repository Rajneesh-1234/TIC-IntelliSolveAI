package com.hackthone.mapper;

import com.hackthone.entity.Crop;
import com.hackthone.payload.requestDTO.CropRequestDTO;
import com.hackthone.payloadresponseDTO.CropResponseDTO;

public class CropMapper {
	public Crop mapToEntity(CropRequestDTO dto) {
	    return Crop.builder()
	            .cropName(dto.getCropName())
	            .quantity(dto.getQuantity())
	            .price(dto.getPrice())
	            .location(dto.getLocation())
	            .build();
	}

	public CropResponseDTO mapToDTO(Crop crop) {
	    return CropResponseDTO.builder()
	            .id(crop.getId())
	            .cropName(crop.getCropName())
	            .quantity(crop.getQuantity())
	            .price(crop.getPrice())
	            .location(crop.getLocation())
	            .build();
	}
}
