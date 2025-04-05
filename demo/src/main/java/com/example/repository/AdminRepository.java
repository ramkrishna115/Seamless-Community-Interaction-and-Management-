// package com.example.repository;
 
// import com.example.model.Admin;

// import org.springframework.data.mongodb.repository.MongoRepository;

// import org.springframework.stereotype.Repository;



// @Repository
// public interface AdminRepository extends MongoRepository<Admin, String> {
//     Admin findByEmail(String email); 
// }

package com.example.repository;

import com.example.model.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AdminRepository extends MongoRepository<Admin, String> {
}
