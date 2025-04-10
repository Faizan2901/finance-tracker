package com.codemind.finance_tracker.repository;

import java.time.YearMonth;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.codemind.finance_tracker.model.Budget;
import com.codemind.finance_tracker.model.User;

@Repository
public interface BudgetReository extends JpaRepository<Budget,Long>{
	
	List<Budget> findByUser(User user);
	
	Budget findByUserAndCategoryAndMonth(User user,String category,YearMonth month);

}
