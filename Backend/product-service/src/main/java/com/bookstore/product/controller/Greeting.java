package com.bookstore.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.product.entity.util.ApiResponse;

@RestController
@RequestMapping(path = "/api/product")
public class Greeting {
	
	@Autowired ApiResponse apiResponse;

	@GetMapping
	public ResponseEntity<ApiResponse> callGreeting() {
		
		apiResponse.setCode(HttpStatus.OK);
		apiResponse.setMessage("Wellcome Product service");
		
		return ResponseEntity.ok(apiResponse);
	}
}
