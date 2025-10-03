package com.bookstore.auth.util;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationToken;
import org.springframework.stereotype.Component;

import com.bookstore.auth.entity.UserLoginLog;
import com.bookstore.auth.enums.LoginMode;
import com.bookstore.auth.repository.UserLoginLogRepo;

@Component
public class AuthenticationEvents {

	@Autowired
	private UserLoginLogRepo userLoginRepository;

	@EventListener
	public void onSuccess(AuthenticationSuccessEvent success) {
		var auth = success.getAuthentication();
		System.out.println("Auth class: " + auth.getClass().getName());

		if (auth instanceof OAuth2AuthenticationToken oauthToken) {
			handleOAuth2(oauthToken);
		} else if (auth instanceof OAuth2LoginAuthenticationToken loginToken) {
			handleOAuth2Login(loginToken);
		} else {
			// not an OAuth2 login (maybe form login / basic auth)
			return;
		}
	}

	private void handleOAuth2(OAuth2AuthenticationToken oauthToken) {
		Map<String, Object> attributes = oauthToken.getPrincipal().getAttributes();
		processGoogleAttributes(oauthToken.getAuthorizedClientRegistrationId(), attributes);
	}

	private void handleOAuth2Login(OAuth2LoginAuthenticationToken loginToken) {
		Map<String, Object> attributes = loginToken.getPrincipal().getAttributes();
		processGoogleAttributes(loginToken.getClientRegistration().getRegistrationId(), attributes);
	}

	private void processGoogleAttributes(String provider, Map<String, Object> attributes) {
		 String email = null;
		    Boolean emailVerified = false;
		    String name = null;
		    String picture = null;
		    LocalDateTime tokenExpire = null;
		    String subId=null;

		    if ("google".equalsIgnoreCase(provider)) {
		    	subId=(String) attributes.get("sub");
		        email = (String) attributes.get("email");
		        emailVerified = (Boolean) attributes.getOrDefault("email_verified", false);
		        name = (String) attributes.get("name");
		        picture = (String) attributes.get("picture");

		        Object expObj = attributes.get("exp");
		        Instant instant = null;
		        if (expObj instanceof String expString) {
		            instant = Instant.parse(expString);
		        } else if (expObj instanceof Number expNumber) {
		            instant = Instant.ofEpochSecond(expNumber.longValue());
		        } else if (expObj instanceof Instant expInstant) {
		            instant = expInstant;
		        }
		        if (instant != null) {
		            ZonedDateTime istTime = instant.atZone(ZoneId.of("Asia/Kolkata"));
		            tokenExpire = istTime.toLocalDateTime();
		        }

		    } else if ("github".equalsIgnoreCase(provider)) {
		        subId = String.valueOf(attributes.get("id"));
		        email = (String) attributes.get("email"); // can be null
		        name = (String) attributes.get("name");
		        picture = (String) attributes.get("avatar_url");

		        String updatedAtStr = (String) attributes.get("updated_at");
		        if (updatedAtStr != null) {
		            Instant instant = Instant.parse(updatedAtStr);
		            ZonedDateTime istTime = instant.atZone(ZoneId.of("Asia/Kolkata"));
		            tokenExpire = istTime.toLocalDateTime();
		        }

		        emailVerified = true; // GitHub doesn’t provide verification explicitly
		    }

//		    if (email == null || !emailVerified) {
//		        return;
//		    }

		    UserLoginLog log = new UserLoginLog();
		    log.setSubId(subId);
		    log.setMail(email);
		    log.setName(name != null ? name : (String) attributes.get("login"));
		    log.setLoginMode(LoginMode.valueOf(provider.toUpperCase()));
		    log.setPicture(picture);
		    log.setIsVerified(emailVerified);
		    log.setTokenExpire(tokenExpire);

		    userLoginRepository.save(log);
	}

}
