package com.coderdot.controllers;

import com.coderdot.entities.Customer;
import com.coderdot.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final CustomerRepository customerRepository;

    @Autowired
    public AdminController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/approve/{customerId}")
    public ResponseEntity<?> approveCustomer(@PathVariable Long customerId) {
        System.out.println("Received request to approve customer with ID: " + customerId); // log input
        Optional<Customer> customerOptional = customerRepository.findById(customerId);

        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            System.out.println("Customer found: " + customer); // log customer before update
            customer.setEnable(true);
            customerRepository.save(customer);  // Persist the updated customer
            System.out.println("Customer approved: " + customer); // log after saving
            return ResponseEntity.ok(customer);
        } else {
            System.out.println("Customer not found with ID: " + customerId); // log not found case
            return ResponseEntity.badRequest().body("Customer not found.");
        }
    }
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/disapprove/{customerId}")
    public ResponseEntity<?> disapproveCustomer(@PathVariable Long customerId) {
        Optional<Customer> customerOptional = customerRepository.findById(customerId);

        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            customer.setEnable(false);
            customerRepository.save(customer);
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.badRequest().body("Customer not found.");
        }
    }
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/listStudents")
    public ResponseEntity<List<Customer>> listCustomer() {
        List<Customer> customerOptional = customerRepository.findAll();
            return ResponseEntity.ok(customerOptional);
    }
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/deleteUser/{customerId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long customerId) {
        Optional<Customer> customerOptional = customerRepository.findById(customerId);

        if (customerOptional.isPresent()) {
            customerRepository.deleteById(customerId);  // Delete the customer by ID
            return ResponseEntity.ok().build(); // Return 200 OK with no body
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Customer not found.");
        }
    }

    @GetMapping("/countCustomers")
    public ResponseEntity<Long> countCustomers() {
        long customerCount = customerRepository.count()-1; // Count customers
        return ResponseEntity.ok(customerCount);
    }


}