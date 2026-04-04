package com.hackthone.service;

import java.util.List;

import com.hackthone.payload.requestDTO.BuyerRequestDTO;
import com.hackthone.payloadresponseDTO.BuyerResponseDTO;

public interface Buyerservice {

    BuyerResponseDTO addBuyer(BuyerRequestDTO dto);

    List<BuyerResponseDTO> getAllBuyers();

    void deleteBuyer(Long id);
}