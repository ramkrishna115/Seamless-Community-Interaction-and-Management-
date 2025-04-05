package com.example.service;

import com.example.model.Admin;
import com.example.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Method to register a new admin
    public Admin registerAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
}
