package com.bookstore.auth.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;


@Component
public class ApolicationUtils {
	
	public String getUserName(){
		
		Authentication auth=SecurityContextHolder.getContext().getAuthentication();
		
		auth.getPrincipal();
		
		return null;
		
	}

}
