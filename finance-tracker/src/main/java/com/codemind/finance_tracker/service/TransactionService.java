package com.codemind.finance_tracker.service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.codemind.finance_tracker.exception.BudgetExceededException;
import com.codemind.finance_tracker.model.Budget;
import com.codemind.finance_tracker.model.Transaction;
import com.codemind.finance_tracker.model.User;
import com.codemind.finance_tracker.repository.BudgetReository;
import com.codemind.finance_tracker.repository.TransactionRepository;
import com.codemind.finance_tracker.repository.UserRepository;

@Service
public class TransactionService {

	@Autowired
	private TransactionRepository transactionRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BudgetReository budgetReository;

	public Transaction save(Transaction tx) {

		String loggedUsername = SecurityContextHolder.getContext().getAuthentication().getName();

		User user = userRepository.findByUsername(loggedUsername)
				.orElseThrow(() -> new UsernameNotFoundException(loggedUsername + " is not found"));
		tx.setUser(user);

		String category = tx.getCategory();
		YearMonth month = YearMonth.from(tx.getDate());

		LocalDate start = month.atDay(1);
		LocalDate end = month.atEndOfMonth();

		List<Transaction> txList = transactionRepository.findByUserAndCategoryAndMonth(user, category, start, end);

		Double totalAmount = txList.stream().mapToDouble(Transaction::getAmount).sum();

		Budget budget = getMonthBudget(user, category, month);

		if (totalAmount + tx.getAmount() > budget.getAmount()) {
			throw new BudgetExceededException("Budget exceeded for category: " + category + " in " + month+", Please review your budgets");
		}

		return transactionRepository.save(tx);
	}

	public List<Transaction> getAllTransactionByUser() {

		String loggedUsername = SecurityContextHolder.getContext().getAuthentication().getName();

		User user = userRepository.findByUsername(loggedUsername)
				.orElseThrow(() -> new UsernameNotFoundException(loggedUsername + " is not found"));

		return transactionRepository.findByUser(user);
	}

	private Budget getMonthBudget(User user, String category, YearMonth month) {
		return budgetReository.findByUserAndCategoryAndMonth(user, category, month);
	}

}
