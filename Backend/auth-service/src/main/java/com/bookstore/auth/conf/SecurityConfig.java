package com.bookstore.auth.conf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import com.bookstore.auth.util.JwtAuthFilter;
import com.bookstore.auth.util.JwtUtil;

import jakarta.servlet.http.Cookie;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Value("${ui.main.url}")
    private String frontendURL;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthFilter jwtAuthFilter) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/oauth2/**", "/api/auth/signup", "/api/auth/signin","/api/auth/greeting").permitAll()
                .anyRequest().authenticated()
            )
            // ✅ For OAuth2 login
            .oauth2Login(oauth -> oauth.successHandler(successHandler()))
            .addFilterBefore(jwtAuthFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return (request, response, authentication) -> {
            String username = authentication.getName();

            // Generate 7-day JWT
            String jwt = JwtUtil.generateToken(username);

            // Store in cookie
            Cookie cookie = new Cookie("AUTH_TOKEN",jwt);
            cookie.setHttpOnly(true);
            cookie.setSecure(false);   // ⚠️ false for localhost, true in prod
            cookie.setPath("/");
            cookie.setMaxAge(24 * 60 * 60);

            response.addCookie(cookie);

            // Redirect to frontend
            response.sendRedirect(frontendURL + "/main");
        };
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
