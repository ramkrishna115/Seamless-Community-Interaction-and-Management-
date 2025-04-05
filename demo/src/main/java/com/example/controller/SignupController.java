package com.example.controller;

import com.example.model.Signup;
import com.example.repository.SignupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/signup")
@CrossOrigin(origins = "http://localhost:5173")
public class SignupController {

    @Autowired
    private SignupRepository signupRepository;

    @PostMapping
    public ResponseEntity<Signup> registerUser(@RequestBody Signup signup) {
        Signup savedUser = signupRepository.save(signup);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping
    public ResponseEntity<Iterable<Signup>> getAllUsers() {
        return ResponseEntity.ok(signupRepository.findAll());
    }

    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Signup loginRequest) {
        Optional<Signup> user = signupRepository.findByEmail(loginRequest.getEmail());

        if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }

    @GetMapping("/user/{email}")
public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
    Optional<Signup> userOptional = signupRepository.findByEmail(email);
    if (userOptional.isPresent()) {
        return ResponseEntity.ok(userOptional.get());
    } else {
        return ResponseEntity.status(404).body("User not found");
    }
}

}
