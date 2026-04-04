package com.hackthone.payloadresponseDTO;



import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponseDTO {

    private Long id;

    private String reviewerName;
    private int rating;
    private String comment;

    private LocalDate reviewDate;
}