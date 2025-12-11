package com.BRIS.Login.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_login")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "gmail_account", nullable = false, unique = true)
    private String gmailAccount;

    @Column(nullable = false)
    private String password;

    @Column(name = "resetToken")
    private String resetToken;

    @Column(name = "token_expiry")
    private LocalDateTime tokenExpiry;



}
