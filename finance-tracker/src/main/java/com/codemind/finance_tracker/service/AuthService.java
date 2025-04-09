package com.codemind.finance_tracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.codemind.finance_tracker.exception.InvalidCredentialsException;
import com.codemind.finance_tracker.exception.UserAlreadyPresent;
import com.codemind.finance_tracker.exception.UserNotFoundException;
import com.codemind.finance_tracker.model.User;
import com.codemind.finance_tracker.repository.UserRepository;


@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtService jwtUtility;
	
	@Autowired
    private PasswordEncoder passwordEncoder;
	
	public String registerUser(User user) {
		if(userRepository.findByUsername(user.getUsername()).isPresent()) {
			throw new UserAlreadyPresent("User already exists!");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setRole("USER");
		user.setUsername(user.getUsername());
		userRepository.save(user);
		
		return "User registered successfully!";
	}
	
	public String loginUser(String username,String password) {
		User user=userRepository.findByUsername(username)
				.orElseThrow(() -> new UserNotFoundException("User not found!"));
		
		if(!passwordEncoder.matches(password,user.getPassword())) {
			throw new InvalidCredentialsException("Invalid credentials!");
		}
		
		return jwtUtility.generateToken(username);
	}
	
	
}
