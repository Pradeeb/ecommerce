package com.bookstore.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookstore.product.entity.Product;

@Repository
public interface ProductMetaRepo extends JpaRepository<Product, Long> {
}
