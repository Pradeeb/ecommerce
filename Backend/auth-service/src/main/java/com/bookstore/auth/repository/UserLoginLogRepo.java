package com.bookstore.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookstore.auth.entity.UserLoginLog;

@Repository
public interface UserLoginLogRepo extends JpaRepository<UserLoginLog, Long> {

}
