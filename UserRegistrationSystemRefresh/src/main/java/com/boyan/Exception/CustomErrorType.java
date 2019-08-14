package com.boyan.Exception;

import com.boyan.dto.UserDTO;

public class CustomErrorType extends UserDTO {
	private String errorMessage;
	
	public CustomErrorType(final String errorMessage) {
		this.errorMessage = errorMessage;
	}

	@Override
	public String getErrorMessage() {
		return errorMessage;
	}
	
}
