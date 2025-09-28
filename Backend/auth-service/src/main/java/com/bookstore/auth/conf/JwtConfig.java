package com.bookstore.auth.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.*;

import java.time.Duration;

@Configuration
public class JwtConfig {

/*	
	
    @Bean
    public JwtDecoder jwtDecoder() {
        // Google JWKS URL
        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withJwkSetUri(
                "https://www.googleapis.com/oauth2/v3/certs")
                .build();

        // Build validator with clock skew
        OAuth2TokenValidator<Jwt> withClockSkew = new DelegatingOAuth2TokenValidator<>(
                JwtValidators.createDefault(),                     // default validators
                new JwtTimestampValidator(Duration.ofMinutes(2))   // allow 2 min skew
        );

        jwtDecoder.setJwtValidator(withClockSkew);
        return jwtDecoder;
    }
    
*/
	
}
