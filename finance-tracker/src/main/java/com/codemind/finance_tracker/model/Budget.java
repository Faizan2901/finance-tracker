package com.codemind.finance_tracker.model;

import java.time.LocalDate;
import java.time.YearMonth;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "budget")
public class Budget {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	
	private String category;
	
	private Double amount;
	
	@DateTimeFormat(pattern = "yyyy-MM")
	private YearMonth month;
	
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonBackReference
	private User user;


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
	}


	public Double getAmount() {
		return amount;
	}


	public void setAmount(Double amount) {
		this.amount = amount;
	}


	public YearMonth getMonth() {
		return month;
	}


	public void setMonth(YearMonth month) {
		this.month = month;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	@Override
	public String toString() {
		return "Budget [id=" + id + ", category=" + category + ", amount=" + amount + ", yearMonth=" + month + ", user="
				+ user + "]";
	}
	
	
	
}
