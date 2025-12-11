package com.BRIS.Login.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PageController {

    @GetMapping("/residentsinfo")
    public String showResidentInfoPage() {
        return "residentsinfo";
    }
}
