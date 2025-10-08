package com.bookstore.auth.service;

import com.bookstore.auth.entity.User;
import com.bookstore.auth.util.ApiResponse;

public interface IUserService {
   public ApiResponse signUpNewUser(User user);
}
