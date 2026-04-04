package com.hackthone.payload.requestDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
		
		@NotBlank(message = "email and passwrod is mandatory")
	    private String email;

		@NotBlank(message = "email and passwrod is mandatory")
	    private String password;
	}
