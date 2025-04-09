package com.codemind.finance_tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codemind.finance_tracker.model.Transaction;
import com.codemind.finance_tracker.service.TransactionService;

@RestController
@RequestMapping("/api/transaction")
@CrossOrigin(origins = "http://localhost:4200")
public class TransactionController {
	
	@Autowired
	private TransactionService transactionService;
	
	@PostMapping
	public Transaction create(@RequestBody Transaction transaction) {
		return transactionService.save(transaction);
	}
	
	@GetMapping
	public List<Transaction> getUserTransactions(){
		return transactionService.getAllTransactionByUser();
	}

}
