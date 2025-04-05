// package com.example.controller;

// import com.example.model.Admin;
// import com.example.repository.AdminRepository;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import java.util.List;

// @CrossOrigin(origins = "http://localhost:5173") 
// @RestController
// @RequestMapping("/admins")
// public class AdminController {
//     private final AdminRepository adminRepository;

//     public AdminController(AdminRepository adminRepository) {
//         this.adminRepository = adminRepository;
//     }

//     @GetMapping
//     public List<Admin> getAllAdmins() {
//         return adminRepository.findAll();
//     }

//     @PostMapping("/login")
//     public ResponseEntity<?> loginAdmin(@RequestBody Admin loginRequest) {
//         Admin admin = adminRepository.findByEmail(loginRequest.getEmail());
    
//         if (admin != null && admin.getPassword().equals(loginRequest.getPassword())) {
//             admin.setPassword(null);
//             return ResponseEntity.ok(admin); 
//         } else {
//             return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
//         }
//     }
    
// //     @PostMapping
// //     public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
// //         if (adminRepository.findByEmail(admin.getEmail()) != null) {
// //             return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already registered.");
// //         }
// //         Admin savedAdmin = adminRepository.save(admin);
// //         savedAdmin.setPassword(null);
// //         return ResponseEntity.ok(savedAdmin);
// //     }
// // }

// @PostMapping
// public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
//     if (adminRepository.findByEmail(admin.getEmail()) != null) {
//         // Return a JSON response for error
//         return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                              .body(new ErrorResponse("Email already registered"));
//     }
//     Admin savedAdmin = adminRepository.save(admin);
//     savedAdmin.setPassword(null);
//     return ResponseEntity.ok(savedAdmin);
// }

// // Error response class
// public static class ErrorResponse {
//     private String message;

//     public ErrorResponse(String message) {
//         this.message = message;
//     }

//     public String getMessage() {
//         return message;
//     }

//     public void setMessage(String message) {
//         this.message = message;
//     }
// }}

package com.example.controller;

import com.example.model.Admin;
import com.example.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admins")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    // Endpoint to register a new admin
    @PostMapping
    public ResponseEntity<?> registerAdmin(@RequestBody Admin admin) {
        try {
            // Save the admin object in MongoDB
            Admin savedAdmin = adminRepository.save(admin);

            // Return success response
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAdmin);
        } catch (Exception e) {
            // Return error response if any issues during saving
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    // Endpoint to get all admins (for testing or other purposes)
    @GetMapping
    public ResponseEntity<?> getAllAdmins() {
        try {
            // Fetch all admins from MongoDB
            return ResponseEntity.ok(adminRepository.findAll());
        } catch (Exception e) {
            // Return error response if any issues
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
}
