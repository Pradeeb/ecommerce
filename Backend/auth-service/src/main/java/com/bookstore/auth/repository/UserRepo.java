package com.bookstore.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookstore.auth.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {

	User findByMobileNumber(String mobileNumber);

}
