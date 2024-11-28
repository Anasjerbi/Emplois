package com.coderdot.repository;

import com.coderdot.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Customer, Long> {
    // Method to find a user by email
    Optional<Customer> findByEmail(String email);
}
