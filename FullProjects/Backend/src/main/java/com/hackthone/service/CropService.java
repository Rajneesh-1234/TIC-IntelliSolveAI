package com.hackthone.service;

import java.util.List;

import com.hackthone.payload.requestDTO.CropRequestDTO;
import com.hackthone.payloadresponseDTO.CropResponseDTO;

public interface CropService {

    CropResponseDTO addCrop(CropRequestDTO requestDTO);
    List<CropResponseDTO> getAllCrops();

    void deleteCrop(Long id);

}