package com.BRIS.Login.controller;

import com.BRIS.Login.entity.History;
import com.BRIS.Login.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/history")
public class HistoryController {

    @Autowired
    private HistoryRepository historyRepository;

    @GetMapping
    public List<History> getAllHistory() {
        return historyRepository.findAllByOrderByIdDesc();
    }
}
