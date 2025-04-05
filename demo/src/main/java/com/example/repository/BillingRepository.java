
package com.example.repository;
import com.example.model.Billing;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BillingRepository extends MongoRepository<Billing, String> {
}
