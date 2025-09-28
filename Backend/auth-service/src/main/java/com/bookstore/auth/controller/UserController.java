package com.bookstore.auth.controller;

import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
	
	@GetMapping(path = "/user")
	public Map<String,Object> user(@AuthenticationPrincipal OAuth2User pricipal){
		System.out.println(pricipal.getAttributes());
		return pricipal.getAttributes();
	}

}
