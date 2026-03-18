package com.bookstore.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.product.entity.util.ApiResponse;
import com.bookstore.product.service.IProductService;

@RestController
@RequestMapping(path = "/api/product")
public class Product {
	
//	@Autowired ApiResponse apiResponse;  its singleton it affect same time data change
	@Autowired IProductService productService;
	
	@GetMapping(path ="/getall")
	public ResponseEntity<ApiResponse> getAllProduct() {
		ApiResponse apiResponse =new ApiResponse();
		apiResponse.setCode(HttpStatus.OK);
		apiResponse.setMessage("Wellcome Product service");
		apiResponse.setPayLoad(productService.getAllProduct());
		
		return ResponseEntity.ok(apiResponse);
	}
	
	@GetMapping("/id/{id}")
	public ResponseEntity<ApiResponse> getProductById(@PathVariable("id") Long id) {

	    ApiResponse apiResponse = new ApiResponse();
	    apiResponse.setCode(HttpStatus.OK);
	    apiResponse.setMessage("Product fetched successfully");
	    apiResponse.setPayLoad(productService.getProductById(id));

	    return ResponseEntity.ok(apiResponse);
	}
	
	@GetMapping(path="/getcategory")
	public ResponseEntity<ApiResponse> getAllCategory(){
		ApiResponse apiResponse =new ApiResponse();
		apiResponse.setCode(HttpStatus.OK);
		apiResponse.setMessage("Wellcome category service");
		apiResponse.setPayLoad(productService.getAllCategory());
		
		return ResponseEntity.ok(apiResponse);
	}
	
	@GetMapping(path="/category/{category}")
	public ResponseEntity<ApiResponse> getCategory(@PathVariable("category") String category){
		ApiResponse apiResponse =new ApiResponse();
		apiResponse.setCode(HttpStatus.OK);
		apiResponse.setMessage("Wellcome category service");
		apiResponse.setPayLoad(productService.getCategory(category));
		
		return ResponseEntity.ok(apiResponse);
	}

}
