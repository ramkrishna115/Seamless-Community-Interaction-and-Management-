package com.example.controller;

import com.example.model.AuthUser;
import com.example.repository.AuthUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Adjust if needed
public class AuthController {

    @Autowired
    private AuthUserRepository authUserRepository;

    @GetMapping("/user/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        Optional<AuthUser> user = authUserRepository.findByEmail(email);
    
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
    
    
}
