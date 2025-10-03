package com.bookstore.auth.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookstore.auth.entity.UserLoginLog;

@Repository
public interface UserLoginLogRepo extends JpaRepository<UserLoginLog, Long> {

	Optional<UserLoginLog> findTopByMailOrderByIdDesc(String username);

	List<UserLoginLog> findBySubId(String name);

}
