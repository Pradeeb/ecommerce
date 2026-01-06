package com.bookstore.gateway.filter;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthFilter implements WebFilter {

    private static final String SECRET = "mySecretKey12345mySecretKey12345";
    private static final Key key =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    private static final List<String> PUBLIC_URLS = List.of(
        "/api/auth/signup",
        "/api/auth/signin",
        "/api/auth/logout",   // ✅ important
        "/api/auth/greeting",
        "/oauth2/authorization/google",
        "/oauth2/authorization/github"
    );

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {

        // ✅ 1. ALWAYS allow preflight
        if ("OPTIONS".equals(exchange.getRequest().getMethod().name())) {
            return chain.filter(exchange);
        }

        String path = exchange.getRequest().getPath().value();
        boolean isPublic = PUBLIC_URLS.stream().anyMatch(path::startsWith);

        // ✅ 2. Extract token
        String token = null;

        if (exchange.getRequest().getCookies().containsKey("AUTH_TOKEN")) {
            token = exchange.getRequest()
                    .getCookies()
                    .getFirst("AUTH_TOKEN")
                    .getValue();
        }

        if (token == null) {
            String authHeader = exchange.getRequest().getHeaders().getFirst("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        // ✅ 3. Public URLs allowed without token
        if (token == null) {
            if (isPublic) {
                return chain.filter(exchange);
            } else {
                exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
                return exchange.getResponse().setComplete();
            }
        }

        // ✅ 4. Validate JWT
        try {
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);

            return chain.filter(exchange);

        } catch (JwtException e) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
    }
}
