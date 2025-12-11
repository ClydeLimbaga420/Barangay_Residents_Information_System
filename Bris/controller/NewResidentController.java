package com.BRIS.Login.controller;

import com.BRIS.Login.entity.History;
import com.BRIS.Login.entity.Resident;
import com.BRIS.Login.repository.HistoryRepository;
import com.BRIS.Login.repository.NewResidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class NewResidentController {

    @Autowired
    private NewResidentRepository newResidentRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @PostMapping("/residents/save")
    public String saveResident(Resident newResident,
                               @RequestParam(value = "photoFile", required = false) MultipartFile file,
                               Model model) {

        try {
            Resident existingResident = null;
            if (newResident.getId() != null) {
                existingResident = newResidentRepository.findById(newResident.getId()).orElse(null);
            }
            if (file != null && !file.isEmpty()) {
                newResident.setPhoto(file.getBytes());
            } else if (existingResident != null && existingResident.getPhoto() != null) {
                newResident.setPhoto(existingResident.getPhoto());
            }

            newResident.setSenior(newResident.getAge() >= 60);
            Resident duplicateResident = newResidentRepository
                    .findByFirstnameAndMiddlenameAndLastnameAndSuffix(
                            newResident.getFirstname(),
                            newResident.getMiddlename(),
                            newResident.getLastname(),
                            newResident.getSuffix()
                    );

            if (duplicateResident != null && (newResident.getId() == null || !duplicateResident.getId().equals(newResident.getId()))) {
                model.addAttribute("errorMessage", "Resident already exists!");

                if (newResident.getPhoto() != null) {
                    String base64Image = java.util.Base64.getEncoder().encodeToString(newResident.getPhoto());
                    model.addAttribute("residentPhotoBase64", base64Image);
                } else if (duplicateResident.getPhoto() != null) {
                    String base64Image = java.util.Base64.getEncoder().encodeToString(duplicateResident.getPhoto());
                    model.addAttribute("residentPhotoBase64", base64Image);
                }

                model.addAttribute("resident", newResident);
                return "newresident";
            }
            newResidentRepository.save(newResident);
            History history = new History("Added/Updated Resident: " + newResident.getFirstname() + " " + newResident.getLastname());
            historyRepository.save(history);
            return "redirect:/success?id=" + newResident.getId();

        } catch (Exception e) {
            e.printStackTrace();
            model.addAttribute("errorMessage", "Error occurred while saving resident");
            model.addAttribute("resident", newResident);
            if (newResident.getPhoto() != null) {
                String base64Image = java.util.Base64.getEncoder().encodeToString(newResident.getPhoto());
                model.addAttribute("residentPhotoBase64", base64Image);
            }

            return "newresident";
        }
    }

    @GetMapping("/success")
    public String viewResident(@RequestParam("id") Long id, Model model) {
        Resident resident = newResidentRepository.findById(id).orElse(null);
        model.addAttribute("resident", resident);
        if (resident != null && resident.getPhoto() != null) {
            String base64Image = java.util.Base64.getEncoder().encodeToString(resident.getPhoto());
            model.addAttribute("residentPhotoBase64", base64Image);
        }

        return "success";
    }
}