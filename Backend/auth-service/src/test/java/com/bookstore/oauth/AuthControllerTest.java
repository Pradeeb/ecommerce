package com.bookstore.oauth;


import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.bookstore.auth.controller.UserController;
import com.bookstore.auth.entity.User;
import com.bookstore.auth.service.IUserService;
import com.bookstore.auth.util.ApiResponse;

import java.util.Map;

class AuthControllerTest {

    @InjectMocks
    private UserController authController;

    @Mock
    private IUserService userService;

    @Mock
    private HttpServletResponse response;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSignin_Success() throws Exception {
        // Arrange
        User user = new User();
        user.setMobileNumber("8940179054");
        user.setPassword("");

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(HttpStatus.OK);
        apiResponse.setMessage("Sign in successful");
        apiResponse.setPayLoad(Map.of("mobileNumber", "8940179054", "name", "valan"));

        when(userService.signInService(any(User.class))).thenReturn(apiResponse);

        // Act
        ResponseEntity<ApiResponse> result = authController.signin(user, response);

        // Assert
        assertEquals(HttpStatus.OK, result.getStatusCode());
        assertEquals("Sign in successful", result.getBody().getMessage());

        // Verify cookie was added to the response
        verify(response, times(1)).addCookie(argThat(cookie -> 
            "AUTH_TOKEN".equals(cookie.getName()) &&
            cookie.getValue() != null &&
            cookie.getMaxAge() == 24 * 60 * 60
        ));
    }

    @Test
    void testSignin_Failure() throws Exception {
        // Arrange
        User user = new User();
        user.setMobileNumber("1234567890");
        user.setPassword("wrongpassword");

        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(HttpStatus.UNAUTHORIZED);
        apiResponse.setMessage("Invalid password");
        apiResponse.setPayLoad(null);

        when(userService.signInService(any(User.class))).thenReturn(apiResponse);

        // Act
        ResponseEntity<ApiResponse> result = authController.signin(user, response);

        // Assert
        assertEquals(HttpStatus.UNAUTHORIZED, result.getStatusCode());
        assertEquals("Invalid password", result.getBody().getMessage());

        // Ensure no cookie is set on failed login
        verify(response, never()).addCookie(any(Cookie.class));
    }
}
