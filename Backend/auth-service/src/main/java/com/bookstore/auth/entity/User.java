package com.bookstore.auth.entity;

import java.time.LocalDateTime;

import com.bookstore.auth.enums.LoginMode;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users") // ✅ must match your table name
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;  // use wrapper Long (nullable safe)

    @Column(name = "mail")
    private String mail;

    @Column(name = "mobile_no")
    private String mobileNumber;

    @Column(name = "name")
    private String name;

    @Column(name = "is_verified")
    private Boolean isVerified;

    @Column(name = "password")
    private String password;

    @Column(name = "image")
    private String picture;

    @Column(name = "token")
    private String token;

    @Column(name = "token_expire")
    private LocalDateTime tokenExpire;

    @Enumerated(EnumType.STRING)
    @Column(name = "login_mode", nullable = false)
    private LoginMode loginMode = LoginMode.LOCAL;

}
