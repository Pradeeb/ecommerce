package com.bookstore.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookstore.product.entity.BookDetails;

@Repository
public interface BookDetailsRepo extends JpaRepository<BookDetails, Long> {
}
