package com.bookstore.product.entity.util;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class ApiResponse {
	private HttpStatus code;
	private Object  payLoad;
	private String message;
}
