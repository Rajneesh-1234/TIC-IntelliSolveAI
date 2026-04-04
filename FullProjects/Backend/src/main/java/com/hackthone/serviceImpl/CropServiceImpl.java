package com.hackthone.serviceImpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hackthone.entity.Crop;
import com.hackthone.payload.requestDTO.CropRequestDTO;
import com.hackthone.payloadresponseDTO.CropResponseDTO;
import com.hackthone.repository.CropRepository;
import com.hackthone.service.CropService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CropServiceImpl implements CropService {

    private final CropRepository cropRepository;

    @Override
    public CropResponseDTO addCrop(CropRequestDTO requestDTO) {

        Crop crop = Crop.builder()
                .cropName(requestDTO.getCropName())
                .quantity(requestDTO.getQuantity())
                .price(requestDTO.getPrice())
                .location(requestDTO.getLocation())
                .build();

        Crop saved = cropRepository.save(crop);

        return CropResponseDTO.builder()
                .id(saved.getId())
                .cropName(saved.getCropName())
                .quantity(saved.getQuantity())
                .price(saved.getPrice())
                .location(saved.getLocation())
                .build();
    }

    @Override
    public List<CropResponseDTO> getAllCrops() {

        return cropRepository.findAll()
                .stream()
                .map(crop -> CropResponseDTO.builder()
                        .id(crop.getId())
                        .cropName(crop.getCropName())
                        .quantity(crop.getQuantity())
                        .price(crop.getPrice())
                        .location(crop.getLocation())
                        .build()
                ).toList();
    }

    @Override
    public void deleteCrop(Long id) {
        cropRepository.deleteById(id);
    }
}