package com.hackthone.payload.requestDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewRequestDTO {

    private String reviewerName;
    private int rating;
    private String comment;

    private Long buyerId;
    private Long farmerId;
}
