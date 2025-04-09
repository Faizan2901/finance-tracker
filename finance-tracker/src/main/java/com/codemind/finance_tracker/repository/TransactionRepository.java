package com.codemind.finance_tracker.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.codemind.finance_tracker.model.Transaction;
import com.codemind.finance_tracker.model.User;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	List<Transaction> findByUser(User user);

	@Query("SELECT t FROM Transaction t WHERE t.user = :user AND t.category = :category AND t.date BETWEEN :start AND :end")
	List<Transaction> findByUserAndCategoryAndMonth(@Param("user") User user, @Param("category") String category,
			@Param("start") LocalDate start, @Param("end") LocalDate end);

}
