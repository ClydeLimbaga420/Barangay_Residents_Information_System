package com.BRIS.Login.service;

import com.BRIS.Login.entity.Resident;
import com.BRIS.Login.repository.ResidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResidentService {

    @Autowired
    private ResidentRepository residentRepository;


    public Resident save(Resident resident) {
        return residentRepository.save(resident);
    }

    public Resident findById(Long id) {
        return residentRepository.findById(id).orElse(null);
    }
}
