package com.codemind.finance_tracker.exception;

public class BudgetExceededException extends RuntimeException {
	
	public BudgetExceededException(String message) {
		super(message);
	}

}
