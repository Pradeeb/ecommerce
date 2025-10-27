package com.bookstore.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bookstore.product.entity.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
	
	@Query("SELECT p.category FROM Product p GROUP BY p.category ORDER BY p.category ASC")
	List<String> findGroupedCategories();

}
