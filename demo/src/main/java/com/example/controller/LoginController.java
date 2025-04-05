package com.example.controller;

import com.example.dto.LoginResponse;
import com.example.model.Signup;
import com.example.repository.SignupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:5173")
public class LoginController {

    @Autowired
    private SignupRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Signup loginRequest) {
        Optional<Signup> userOptional = userRepository.findByEmail(loginRequest.getEmail());

        if (userOptional.isPresent()) {
            Signup user = userOptional.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {
             
                return ResponseEntity.ok(new LoginResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getRole()
                ));
            }
        }

        return ResponseEntity.status(401).body("Invalid email or password.");
    }
}
