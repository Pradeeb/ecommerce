package com.bookstore.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.product.entity.util.ApiResponse;
import com.bookstore.product.service.IProductService;

@RestController
@RequestMapping(path = "/api/product")
public class Product {
	
	@Autowired ApiResponse apiResponse;
	@Autowired IProductService productService;
	
	@GetMapping(path ="/getall")
	public ResponseEntity<ApiResponse> getAllProduct() {
		
		apiResponse.setCode(HttpStatus.OK);
		apiResponse.setMessage("Wellcome Product service");
		apiResponse.setPayLoad(productService.getAllProduct());
		
		return ResponseEntity.ok(apiResponse);
	}
	
	@GetMapping(path="/getcategory")
	public ResponseEntity<ApiResponse> getCategory(){
		
		apiResponse.setCode(HttpStatus.OK);
		apiResponse.setMessage("Wellcome category service");
		apiResponse.setPayLoad(productService.getAllCategory());
		
		return ResponseEntity.ok(apiResponse);
	}

}
