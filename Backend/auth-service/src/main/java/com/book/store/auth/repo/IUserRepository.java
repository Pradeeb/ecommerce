package com.book.store.auth.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.book.store.auth.entity.User;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
	    Optional<User> findByMobileNumber(String mobileNumber);
	    Optional<User> findByEmail(String email);
	}