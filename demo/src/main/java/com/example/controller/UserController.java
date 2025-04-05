
package com.example.controller;

import com.example.model.User;
import com.example.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")  // Allow requests from React app running on localhost:5173
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register User
    @PostMapping
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        // Save the user to the repository
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        // Fetch all users from the repository
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    // Other controller methods (get by ID, update, delete)...    
}
