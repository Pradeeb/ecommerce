package com.bookstore.auth.conf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
	
	   @Value("${ui.main.url}")
       private String frontendURL;
	
	@Bean SecurityFilterChain defaultSecurityFuilterChain(HttpSecurity http) throws Exception{
		
		http.csrf(AbstractHttpConfigurer::disable)
		    .authorizeHttpRequests(x ->{
		    	x.anyRequest().authenticated();
		    })
		    .oauth2Login(x -> x.defaultSuccessUrl(frontendURL+"/main",true));
		  //  .formLogin(x -> x.defaultSuccessUrl("/hello",true));
		
		return http.build();
		
	}

}


