package com.bookstore.product.service;

import java.util.List;

import com.bookstore.product.entity.Product;

public interface IProductService {
	
	public List<Product> getAllProduct();
	public List<String> getAllCategory();
	public Product getProductById(Long id);

}
