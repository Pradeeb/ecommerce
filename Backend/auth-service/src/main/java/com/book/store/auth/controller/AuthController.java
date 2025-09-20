package com.book.store.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.book.store.auth.dto.JwtResponse;
import com.book.store.auth.dto.OtpRequest;
import com.book.store.auth.dto.VerifyOtpRequest;
import com.book.store.auth.service.impl.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired private AuthService authService;
	
	public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Request OTP
    @PostMapping("/request-otp")
    public ResponseEntity<String> requestOtp(@RequestBody OtpRequest request) {
        authService.generateOtp(request.getMobileNumber());
        return ResponseEntity.ok("OTP sent to mobile");
    }

    // Verify OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<JwtResponse> verifyOtp(@RequestBody VerifyOtpRequest request) {
        String token = authService.verifyOtp(request.getMobileNumber(), request.getOtp());
        return ResponseEntity.ok(new JwtResponse(token));
    }

    // OAuth2 Login (Google/Facebook/Instagram callback)
    @PostMapping("/oauth-login")
    public ResponseEntity<JwtResponse> oauthLogin(@RequestParam String email,
                                                  @RequestParam String provider) {
        String token = authService.oauthLogin(email, provider);
        return ResponseEntity.ok(new JwtResponse(token));
    }

}
