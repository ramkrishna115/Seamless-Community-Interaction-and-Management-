


package com.example.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Document(collection = "users")
public class User {
    @Id
    private String id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "Phone number is mandatory")
    @Pattern(regexp = "^\\d{10}$", message = "Phone number must be a 10-digit number")
    private String phoneNumber;

    @NotBlank(message = "Society name is mandatory")
    private String societyName;

    @NotBlank(message = "FlatNo is mandatory")
    private String flatNo;

    @NotBlank(message = "Postalcode address is mandatory")
    private String postalcode;

    @NotBlank(message = "Role is mandatory")
    private String role; 

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getSocietyName() { return societyName; }
    public void setSocietyName(String societyName) { this.societyName = societyName; }

    public String getFlatNo() { return flatNo; }
    public void setFlatNo(String flatNo) { this.flatNo = flatNo; }

    public String getPostalcode() { return postalcode; }
    public void setPostalcode(String postalcode) { this.postalcode = postalcode; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
