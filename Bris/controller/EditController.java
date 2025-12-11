package com.BRIS.Login.controller;

import com.BRIS.Login.entity.Resident;
import com.BRIS.Login.service.ResidentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
public class EditController {

    @Autowired
    private ResidentService residentService;

    @GetMapping("/editresident")
    public String editResidentPage(@RequestParam Long id, Model model) {
        Resident resident = residentService.findById(id);
        if (resident == null) {
            throw new IllegalArgumentException("Invalid resident ID: " + id);
        }
        model.addAttribute("resident", resident);
        return "editresident";
    }

    @PostMapping("/residents/update")
    public String saveResident(@ModelAttribute Resident resident,
                               @RequestParam(value = "photo", required = false) MultipartFile photo) throws IOException {
        if (photo != null && !photo.isEmpty()) {
            resident.setPhoto(photo.getBytes());
        }

        residentService.save(resident);
        return "redirect:/residentinfo?id=" + resident.getId();
    }
}