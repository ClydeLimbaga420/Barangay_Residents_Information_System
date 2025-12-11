package com.BRIS.Login.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;
import java.util.Set;

@Component
public class AuthInterceptor implements HandlerInterceptor {

    private static final Set<String> PUBLIC_URIS = Set.of(
            "/", "/login", "/signup", "/forgotpassword", "/resetpassword"
    );

    private static final Set<String> RESIDENT_URIS = Set.of(
            "/residents/undo", "/residents/cancel", "/residents/save"
    );

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) throws IOException {

        String uri = request.getRequestURI().toLowerCase();
        HttpSession session = request.getSession(false);

        // 1. Allow public pages
        if (PUBLIC_URIS.contains(uri)) return true;

        // 2. Allow static resources
        if (uri.startsWith("/css/") || uri.startsWith("/js/") || uri.startsWith("/images/")) return true;

        // 3. Allow specific resident paths
        for (String path : RESIDENT_URIS) {
            if (uri.startsWith(path)) return true;
        }

        // 4. Allow if user is logged in
        if (session != null && session.getAttribute("user") != null) return true;

        // 5. Otherwise, redirect to login page
        response.sendRedirect("/"); // your / shows login page
        return false;
    }
}
