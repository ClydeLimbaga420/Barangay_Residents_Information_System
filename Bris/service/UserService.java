package com.BRIS.Login.service;

import com.BRIS.Login.entity.User;
import com.BRIS.Login.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User login(String gmailAccount, String password) {
        User user = userRepository.findByGmailAccount(gmailAccount);
        if (user == null) return null;

        if (passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        return null;
    }

    public User findByGmail(String gmail) {
        return userRepository.findByGmailAccount(gmail);
    }

    public boolean existsByGmail(String gmail) {
        return userRepository.existsByGmailAccount(gmail);
    }
    public void saveResetToken(User user, String token) {
        user.setResetToken(token);
        userRepository.save(user);
    }

    public User findByResetToken(String token) {
        return userRepository.findByResetToken(token);
    }

    public void updatePassword(User user, String newPassword) {
        String hashed = passwordEncoder.encode(newPassword); // BCrypt
        user.setPassword(hashed);
        user.setResetToken(null);
        userRepository.save(user);
    }
    public void clearResetToken(User user) {
        user.setResetToken(null);
        userRepository.save(user);
    }
    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }
}
