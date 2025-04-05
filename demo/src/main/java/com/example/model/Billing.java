package com.example.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "billings")
public class Billing {

    @Id
    private String id;

    private String name;
    private String flatNo;
    private double amount;
    private String billingId;

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getFlatNo() { return flatNo; }
    public void setFlatNo(String flatNo) { this.flatNo = flatNo; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public String getBillingId() { return billingId; }
    public void setBillingId(String billingId) { this.billingId = billingId; }
}
