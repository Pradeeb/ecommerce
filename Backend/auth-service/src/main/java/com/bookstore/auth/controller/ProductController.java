package com.bookstore.auth.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.auth.util.ApiResponse;

@RestController
@RequestMapping(path ="/api/product")
public class ProductController {
	
	public ApiResponse getAllProduct() {
		return null;
	}

}
