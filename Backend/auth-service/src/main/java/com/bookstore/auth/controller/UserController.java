package com.bookstore.auth.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.bookstore.auth.util.JwtUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

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
	
	
	
	@PostMapping(path = "/signin")
	public ResponseEntity<ApiResponse> signin(@ModelAttribute User user,HttpServletResponse response) {

		ApiResponse apiResponse = IUserService.signInService(user);
		
		if (apiResponse.getCode().is2xxSuccessful()) {
            // ✅ Generate JWT
            String jwt = JwtUtil.generateToken(user.getMobileNumber());

            // ✅ Add cookie
            Cookie cookie = new Cookie("AUTH_TOKEN", jwt);
            cookie.setHttpOnly(true);
            cookie.setSecure(false);   // ⚠️ false for localhost, true in prod
            cookie.setPath("/");
            cookie.setMaxAge(24 * 60 * 60);
            response.addCookie(cookie);
            
        }
		
		return new ResponseEntity<>(apiResponse,apiResponse.getCode());
	}
	
}
