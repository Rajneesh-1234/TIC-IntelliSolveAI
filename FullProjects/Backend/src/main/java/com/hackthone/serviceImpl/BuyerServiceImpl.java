package com.hackthone.serviceImpl;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.hackthone.entity.Buyer;
import com.hackthone.mapper.BuyerMapper;
import com.hackthone.payload.requestDTO.BuyerRequestDTO;
import com.hackthone.payloadresponseDTO.BuyerResponseDTO;
import com.hackthone.repository.BuyerRepository;
import com.hackthone.service.Buyerservice;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BuyerServiceImpl implements Buyerservice {

    private final BuyerRepository buyerRepository;

    @Override
    public BuyerResponseDTO addBuyer(BuyerRequestDTO dto) {
        Buyer buyer = BuyerMapper.toEntity(dto);
        Buyer saved = buyerRepository.save(buyer);
        return BuyerMapper.toDTO(saved);
    }

    @Override
    public List<BuyerResponseDTO> getAllBuyers() {
        return buyerRepository.findAll()
                .stream()
                .map(BuyerMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteBuyer(Long id) {
        buyerRepository.deleteById(id);
    }
}