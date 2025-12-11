package com.BRIS.Login.controller;

import com.BRIS.Login.entity.User;
import com.BRIS.Login.repository.ResidentRepository;
import com.BRIS.Login.service.UserService;
import com.BRIS.Login.service.UpdateService;
import com.BRIS.Login.service.MailService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Controller
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final UpdateService updateService;
    private final MailService mailService;
    private final ResidentRepository residentRepository;
    private boolean isLoggedIn(HttpSession session) {
        return session != null && session.getAttribute("user") != null;
    }

    private void preventCaching(HttpServletResponse response) {
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Expires", "0");
    }

    @GetMapping("/")
    public String loginPage(HttpSession session, Model model,
                            @RequestParam(value = "logout", required = false) String logout) {
        if (session != null) session.invalidate();
        if (logout != null) model.addAttribute("logoutMsg", "You have successfully logged out.");
        return "login";
    }

    @PostMapping("/login")
    public String loginSubmit(@RequestParam String gmail_account,
                              @RequestParam String password,
                              HttpSession session, Model model) {
        User user = userService.login(gmail_account, password);
        if (user != null) {
            session.setAttribute("user", user);
            updateService.updateData();
            return "redirect:/homepage";
        } else {
            model.addAttribute("error", "Invalid gmail account or password");
            return "login";
        }
    }

    @GetMapping("/homepage")
    public String homepage(HttpSession session, Model model, HttpServletResponse response) {
        if (!isLoggedIn(session)) {
            return "redirect:/";
        }

        preventCaching(response);

        List<Object[]> sitios = residentRepository.getSitioPopulation();
        List<Object[]> top3 = sitios.stream().limit(3).collect(Collectors.toList());

        model.addAttribute("top3Sitios", top3);
        model.addAttribute("user", session.getAttribute("user"));
        return "homepage";
    }
    @GetMapping("/userguide")
    public String userGuide(HttpSession session, HttpServletResponse response) {
        if (!isLoggedIn(session)) return "redirect:/";
        preventCaching(response);
        return "userGuide";
    }

    @GetMapping("/history")
    public String history(HttpSession session, HttpServletResponse response) {
        if (!isLoggedIn(session)) return "redirect:/";
        preventCaching(response);
        return "history";
    }

    @GetMapping("/newresident")
    public String newResident(HttpSession session, HttpServletResponse response) {
        if (!isLoggedIn(session)) return "redirect:/";
        preventCaching(response);
        return "newresident";
    }

    @GetMapping("/residentsrecords")
    public String residentsRecords(HttpSession session, HttpServletResponse response) {
        if (!isLoggedIn(session)) return "redirect:/";
        preventCaching(response);
        return "residentsrecords";
    }

    @GetMapping("/blotterrecords")
    public String blotterRecords(HttpSession session, HttpServletResponse response) {
        if (!isLoggedIn(session)) return "redirect:/";
        preventCaching(response);
        return "blotterrecords";
    }

    @GetMapping("/reportcase")
    public String reportCase(HttpSession session, HttpServletResponse response) {
        if (!isLoggedIn(session)) return "redirect:/";
        preventCaching(response);
        return "reportcase";
    }

    @GetMapping("/certificates")
    public String certificates(HttpSession session, HttpServletResponse response) {
        if (!isLoggedIn(session)) return "redirect:/";
        preventCaching(response);
        return "certificates";
    }

    @GetMapping("/blotterinfo")
    public String blotterInfo(HttpSession session, HttpServletResponse response) {
        if (!isLoggedIn(session)) return "redirect:/";
        preventCaching(response);
        return "blotterinfo";
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        if (session != null) session.invalidate();
        return "redirect:/?logout";
    }
    @GetMapping("/forgotpassword")
    public String forgotPassword() {
        return "forgotpassword";
    }

    @PostMapping("/forgotpassword")
    public String handleForgotPassword(@RequestParam String gmail_account, Model model) {
        User user = userService.findByGmail(gmail_account);
        if (user == null) {
            model.addAttribute("error", "No account found with this Gmail.");
            return "forgotpassword";
        }

        String token = UUID.randomUUID().toString();
        userService.saveResetToken(user, token);

        String resetLink = "http://localhost:40847/resetpassword?token=" + token;
        String emailBody = "<p>Click the link below to reset your password:</p>" +
                "<a href=\"" + resetLink + "\">Reset Password</a>" +
                "<br><br><p>-BRIS Team</p>";

        mailService.sendHtmlMail(
                user.getGmailAccount(),
                "Password Reset Confirmation",
                emailBody
        );

        model.addAttribute("success", "A confirmation email has been sent to your Gmail.");
        return "forgotpassword";
    }
    @GetMapping("/resetpassword")
    public String resetPasswordPage(@RequestParam String token, Model model) {
        User user = userService.findByResetToken(token);
        if (user == null) {
            model.addAttribute("error", "Invalid token.");
            return "resetpassword";
        }
        model.addAttribute("token", token);
        return "resetpassword";
    }

    @PostMapping("/resetpassword")
    public String handleResetPassword(@RequestParam String token,
                                      @RequestParam String password,
                                      @RequestParam String confirm,
                                      Model model) {
        if (!password.equals(confirm)) {
            model.addAttribute("error", "Passwords do not match.");
            model.addAttribute("token", token);
            return "resetpassword";
        }

        User user = userService.findByResetToken(token);
        if (user == null) {
            model.addAttribute("error", "Invalid token.");
            return "resetpassword";
        }

        userService.updatePassword(user, password);
        userService.clearResetToken(user);

        model.addAttribute("success", "Password has been reset successfully!");
        return "login";
    }
}
