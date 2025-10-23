package com.bookstore.product.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookstore.product.entity.Product;
import com.bookstore.product.repository.ProductRepo;
import com.bookstore.product.service.IProductService;

@Service
public class ProductServiceImpl implements IProductService {

	@Autowired ProductRepo productRepo;
	
	@Override
	public List<Product> getAllProduct() {
		return productRepo.findAll();
	}

}
