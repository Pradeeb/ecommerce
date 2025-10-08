package com.bookstore.auth.service.impl;

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

}
