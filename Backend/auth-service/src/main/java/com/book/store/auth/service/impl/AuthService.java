package com.book.store.auth.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.book.store.auth.entity.User;
import com.book.store.auth.enumtype.LoginType;
import com.book.store.auth.repo.IUserRepository;
import com.book.store.auth.util.JwtUtil;

@Service
public class AuthService {
	
    @Autowired private  IUserRepository userRepository;
    @Autowired private  JwtUtil jwtUtil;

    public AuthService(IUserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // Generate OTP
    public void generateOtp(String mobile) {
        String otp = String.valueOf(new Random().nextInt(900000) + 100000);
        User user = userRepository.findByMobileNumber(mobile)
                .orElse(User.builder().mobileNumber(mobile).loginType(LoginType.mobile).build());

        user.setOtpCode(otp);
        user.setOtpExpiry(LocalDateTime.now().plusMinutes(5));
        userRepository.save(user);

        // TODO: Send OTP via SMS (Twilio / Firebase / AWS SNS)
        System.out.println("Generated OTP: " + otp);
    }

    // Verify OTP & Generate JWT
    public String verifyOtp(String mobile, String otp) {
        User user = userRepository.findByMobileNumber(mobile)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getOtpCode().equals(otp) && user.getOtpExpiry().isAfter(LocalDateTime.now())) {
            return jwtUtil.generateToken(user.getId(), user.getEmail(), List.of(user.getRole()));
        }
        throw new RuntimeException("Invalid OTP");
    }

    // OAuth2 login (Google, Facebook, Instagram)
    public String oauthLogin(String email, String provider) {
        User user = userRepository.findByEmail(email)
                .orElse(User.builder().email(email).loginType(LoginType.email).build());

        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        return jwtUtil.generateToken(user.getId(), user.getEmail(), List.of(user.getRole()));
    }
}
