package com.BRIS.Login.controller;

import com.BRIS.Login.entity.Certificates;
import com.BRIS.Login.repository.CertificatesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/certificates")
public class CertificatesController {

    @Autowired
    private CertificatesRepository certificatesRepository;

    @GetMapping
    public List<Certificates> getAllCertificates(){
        return certificatesRepository.findAll();
    }

    @GetMapping("/{id}")
    public Certificates getCertificateById(@PathVariable Long id) {
        return certificatesRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Certificates createCertificate(@RequestBody Certificates certificates){
        return certificatesRepository.save(certificates);
    }

}
