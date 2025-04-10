package com.codemind.finance_tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codemind.finance_tracker.model.Budget;
import com.codemind.finance_tracker.service.BudgetService;

@RestController
@RequestMapping("/api/budget")
@CrossOrigin(origins = "http://localhost:4200")
public class BudgetController {

	@Autowired
	private BudgetService budgetService;

	@PostMapping
	public Budget create(@RequestBody Budget budget) {
		return budgetService.save(budget);
	}

	@GetMapping
	public List<Budget> getAllBudgetsByUser() {
		return budgetService.getAllBudgetsByUser();
	}

}
