package com.bookstore.auth.service.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bookstore.auth.entity.User;
import com.bookstore.auth.repository.UserRepo;
import com.bookstore.auth.service.IUserService;
import com.bookstore.auth.util.ApiResponse;

@Service
public class UserService implements IUserService {

	@Autowired ApiResponse apiResponse;
	@Autowired UserRepo userRepo;
	
    @Autowired 
    private PasswordEncoder passwordEncoder;  
    	
	@Override
	public ApiResponse signUpNewUser(User user) {
		
		User resUser=userRepo.findByMobileNumber(user.getMobileNumber());
		
		if(resUser != null) {
			apiResponse.setCode(HttpStatus.CONFLICT); 
			apiResponse.setMessage("Mobile number allready have");
			apiResponse.setPayLoad(null);
			return apiResponse;
		}
		
		user.setPassword(passwordEncoder.encode(user.getPassword())); 
		
		userRepo.save(user);
		
		apiResponse.setCode(HttpStatus.CREATED); 
		apiResponse.setMessage("sign up sucessfully");
		apiResponse.setPayLoad(null);
		
		
		return apiResponse;
	}

	@Override
	public ApiResponse signInService(User user) {

		// 1️ Find user by mobile number
		User dbUser = userRepo.findByMobileNumber(user.getMobileNumber());

		if (dbUser == null) {
			apiResponse.setCode(HttpStatus.NOT_FOUND);
			apiResponse.setMessage("User not found");
			apiResponse.setPayLoad(null);
			return apiResponse;
		}

		// 2️ Check password
		if (!passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
			apiResponse.setCode(HttpStatus.UNAUTHORIZED);
			apiResponse.setMessage("Invalid password");
			apiResponse.setPayLoad(null);
			return apiResponse;
		}

		// 3 Return response
		apiResponse.setCode(HttpStatus.OK);
		apiResponse.setMessage("Sign in successful");
		apiResponse.setPayLoad(Map.of("mobileNumber", dbUser.getMobileNumber(), "name", dbUser.getName()));

		return apiResponse;

	}

}
