package com.bookstore.gateway.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Greeting {
    @GetMapping(path = "/greeting")
	public String sayHello() {
		return "Hello World";
	}
}
