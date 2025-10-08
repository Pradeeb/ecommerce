package com.bookstore.auth.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.auth.entity.User;
import com.bookstore.auth.entity.UserLoginLog;
import com.bookstore.auth.repository.UserLoginLogRepo;
import com.bookstore.auth.service.IUserService;
import com.bookstore.auth.util.ApiResponse;

@RestController
@RequestMapping("/api")
public class UserController {
	
	@Autowired UserLoginLogRepo loginLog;
	@Autowired IUserService IUserService;
	
	@GetMapping(path = "/user")
	public Map<String, Object> user(Authentication authentication) {
		
		List<UserLoginLog> logs = loginLog.findBySubId(authentication.getName());
		
	    return Map.of("user", logs);
	}
	
	// payload
	/*
	@PostMapping(path = "/signup")
	public void signUp(@RequestBody User user) {
		System.out.println(user.getMail());
		System.out.println(user.getName());
		System.out.println(user.getMobileNumber());
		System.out.println(user.getPassword());
	}
	*/
	
	//form data
	@PostMapping(path = "/signup")
	public ResponseEntity<ApiResponse> signUp(@ModelAttribute User user) {
		
		ApiResponse apiResponse = IUserService.signUpNewUser(user);
        return new ResponseEntity<>(apiResponse,apiResponse.getCode());
	}
	


}
