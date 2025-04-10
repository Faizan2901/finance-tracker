package com.codemind.finance_tracker.exception;

public class UserAlreadyPresent extends RuntimeException{

	public UserAlreadyPresent(String message) {
		super(message);
	}
	
}
