package com.codemind.finance_tracker.service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.codemind.finance_tracker.model.Budget;
import com.codemind.finance_tracker.model.User;
import com.codemind.finance_tracker.repository.BudgetReository;
import com.codemind.finance_tracker.repository.UserRepository;

@Service
public class BudgetService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BudgetReository budgetReository;

	public Budget save(Budget budget) {

		String loggedUsername = SecurityContextHolder.getContext().getAuthentication().getName();

		User user = userRepository.findByUsername(loggedUsername)
				.orElseThrow(() -> new UsernameNotFoundException(loggedUsername + " is not found"));
		budget.setUser(user);
		return budgetReository.save(budget);

	}

	public List<Budget> getAllBudgetsByUser() {

		String loggedUsername = SecurityContextHolder.getContext().getAuthentication().getName();

		User user = userRepository.findByUsername(loggedUsername)
				.orElseThrow(() -> new UsernameNotFoundException(loggedUsername + " is not found"));

		return budgetReository.findByUser(user);
	}

}
