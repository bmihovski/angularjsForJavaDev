package com.boyan.Exception;

import com.boyan.dto.UsersDTO;

public class CustomErrorType extends UsersDTO {
	private String errorMessage;
	
	public CustomErrorType(final String errorMessage) {
		this.errorMessage = errorMessage;
	}

	public String getErrorMessage() {
		return errorMessage;
	}
	
}
