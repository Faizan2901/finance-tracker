package com.codemind.finance_tracker.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.codemind.finance_tracker.model.User;
import com.codemind.finance_tracker.service.AuthService;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
	
	@Autowired
	private AuthService authService;
	
	@PostMapping("/register")
	public ResponseEntity<Map<String, String>> register(@RequestBody User user){
		Map<String, String> response = new HashMap<>();
		try {
			String result=authService.registerUser(user);
			response.put("message", result);
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		}catch (RuntimeException e) {
			response.put("message", e.getMessage());
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	    }
	}
	
	@PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(@RequestBody Map<String, String> request) {
		
		String token=authService.loginUser(request.get("username"), request.get("password"));
		
		Map<String, String> response=new HashMap<>();
		response.put("token", token);
		response.put("message", "User logged in successfully");
		
        return ResponseEntity.ok(response);
    }

}
