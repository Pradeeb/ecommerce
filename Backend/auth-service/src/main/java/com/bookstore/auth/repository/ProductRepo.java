package com.bookstore.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookstore.auth.entity.Product;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {

}
