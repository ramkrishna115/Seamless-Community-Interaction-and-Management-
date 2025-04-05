package com.example.controller;
import com.example.model.Billing; 
import com.example.repository.BillingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/billings")
public class BillingController {

    @Autowired
    private BillingRepository billingRepository;

    @PostMapping
    public ResponseEntity<String> saveBilling(@RequestBody Billing billing) {
        billingRepository.save(billing);
        return ResponseEntity.ok("Billing saved successfully");
    }
}
