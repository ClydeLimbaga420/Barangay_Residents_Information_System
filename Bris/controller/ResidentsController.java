package com.BRIS.Login.controller;

import com.BRIS.Login.entity.Resident;
import com.BRIS.Login.repository.ResidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/residents")
public class ResidentsController {

    @Autowired
    private ResidentRepository residentRepository;

    @GetMapping
    public List<Resident> getAllResidents() {
        return residentRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resident> getResidentById(@PathVariable Long id) {
        return residentRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @GetMapping("/{id}/photo")
    public ResponseEntity<byte[]> getResidentPhoto(@PathVariable Long id) {
        return residentRepository.findById(id)
                .filter(resident -> resident.getPhoto() != null)
                .map(resident -> ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"photo_" + id + ".jpg\"")
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resident.getPhoto()))
                .orElse(ResponseEntity.notFound().build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateResident(@PathVariable Long id, @RequestBody Resident updatedResident) {
        return residentRepository.findById(id).map(resident -> {

            resident.setFirstname(updatedResident.getFirstname());
            resident.setLastname(updatedResident.getLastname());
            resident.setMiddlename(updatedResident.getMiddlename());
            resident.setSuffix(updatedResident.getSuffix());
            resident.setSex(updatedResident.getSex());
            resident.setBirthdate(updatedResident.getBirthdate());
            resident.setCivilstatus(updatedResident.getCivilstatus());
            resident.setSitio(updatedResident.getSitio());
            resident.setOccupation(updatedResident.getOccupation());
            resident.setContactnumber(updatedResident.getContactnumber());
            resident.setVoterstatus(updatedResident.getVoterstatus());
            resident.setEmail(updatedResident.getEmail());
            resident.setHousehold(updatedResident.getHousehold());
            resident.setReligion(updatedResident.getReligion());
            resident.setBloodtype(updatedResident.getBloodtype());
            resident.setEducation(updatedResident.getEducation());
            resident.setCondition(updatedResident.getCondition());
            resident.setSenior(updatedResident.getSenior());
            resident.setPwd(updatedResident.isPwd());
            resident.setAge(updatedResident.getAge());

            residentRepository.save(resident);
            return ResponseEntity.ok("Resident updated successfully");
        }).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/photo")
    public ResponseEntity<String> updateResidentPhoto(
            @PathVariable Long id,
            @RequestParam("photo") MultipartFile file) {
        return residentRepository.findById(id)
                .map(resident -> {
                    try {
                        resident.setPhoto(file.getBytes());
                        residentRepository.save(resident);
                        return ResponseEntity.ok("Photo updated successfully");
                    } catch (IOException e) {
                        return ResponseEntity.internalServerError().body("Error saving photo");
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/sitio-count")
    public List<Map<String, Object>> getSitioCounts() {

        List<Object[]> result = residentRepository.getSitioPopulation();

        List<Map<String, Object>> sitioList = new ArrayList<>();

        if (result.size() <= 5) {
            for (Object[] row : result) {
                Map<String, Object> sitioData = new HashMap<>();
                sitioData.put("sitio", (String) row[0]);
                sitioData.put("count", ((Long) row[1]));
                sitioList.add(sitioData);
            }
            return sitioList;
        }
        long othersTotal = 0;
        for (int i = 0; i < result.size(); i++) {
            Object[] row = result.get(i);

            if (i < 4) {
                Map<String, Object> sitioData = new HashMap<>();
                sitioData.put("sitio", (String) row[0]);
                sitioData.put("count", ((Long) row[1]));
                sitioList.add(sitioData);
            } else {
                othersTotal += (Long) row[1];
            }
        }

        Map<String, Object> others = new HashMap<>();
        others.put("sitio", "Others");
        others.put("count", othersTotal);
        sitioList.add(others);

        return sitioList;
    }


}