package com.example.dto;

public class LoginResponse {
    private String id;
  
    private String email;
    private String role;

    public LoginResponse(String id,  String email, String role) {
        this.id = id;
     
        this.email = email;
        this.role = role;
    }

    // Getters and Setters
    public String getId() { return id; }
   



    public String getEmail() { return email; }
    

    public String getRole() { return role; }
  
}
