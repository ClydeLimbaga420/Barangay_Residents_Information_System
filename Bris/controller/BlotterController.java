package com.BRIS.Login.controller;

import com.BRIS.Login.entity.Blotter;
import com.BRIS.Login.entity.History;
import com.BRIS.Login.repository.BlotterRepository;
import com.BRIS.Login.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class BlotterController {

    @Autowired
    private BlotterRepository blotterRepository;

    @Autowired
    private HistoryRepository historyRepository;

    @PostMapping("/blotter/add")
    public String addBlotter(Blotter blotter, Model model) {
        try {
            blotterRepository.save(blotter);
            History history = new History("Added a new Blotter for: " +
                    blotter.getComplainantFirstName() + " " + blotter.getComplainantLastName());
            historyRepository.save(history);
            return "redirect:/blotter/success?id=" + blotter.getId();
        } catch (Exception e) {
            model.addAttribute("errorMessage", "Error saving report: " + e.getMessage());
            model.addAttribute("blotter", blotter);
            return "reportcase";
        }
    }

    @GetMapping("/blotter/success")
    public String viewBlotter(@RequestParam("id") Long id, Model model) {
        Blotter blotter = blotterRepository.findById(id).orElse(null);
        model.addAttribute("blotter", blotter);
        return "blotterinfo";
    }

    @PutMapping("/blotter/{id}/status")
    @ResponseBody
    public Blotter updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        Blotter blotter = blotterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Record not found"));
        blotter.setBlotterStatus(payload.get("status"));
        return blotterRepository.save(blotter);
    }

    @RestController
    @RequestMapping("/api/blotters")
    public static class BlotterApiController {

        @Autowired
        private BlotterRepository blotterRepository;

        @GetMapping
        public List<Blotter> getAllBlotters() {
            return blotterRepository.findAllByOrderByDateOfComplainDescIdDesc();
        }

        @GetMapping("/{id}")
        public ResponseEntity<Blotter> getBlotterById(@PathVariable Long id) {
            return blotterRepository.findById(id)
                    .map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        }

        @GetMapping("/search")
        public List<Blotter> searchBlotters(@RequestParam("name") String name) {
            return blotterRepository.findAllByKeyword(name.trim().toLowerCase());
        }
    }
}
