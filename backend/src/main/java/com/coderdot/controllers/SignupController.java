package com.coderdot.controllers;

import com.coderdot.dto.SignupRequest;
import com.coderdot.entities.Customer;
import com.coderdot.services.AuthService;
import com.coderdot.services.jwt.CustomerServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/signup")
public class SignupController {

    private final AuthService authService;
    private final CustomerServiceImpl customerService;

@Autowired
    public SignupController(AuthService authService, CustomerServiceImpl customerService) {
        this.authService = authService;
        this.customerService = customerService;
    }



    @PostMapping
    public ResponseEntity<?> signupCustomer(@RequestBody SignupRequest signupRequest) {
        Customer createdCustomer = authService.createCustomer(signupRequest);
        if (createdCustomer != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCustomer);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create customer");
        }
    }

    @GetMapping("/load-user/{email}")
    public UserDetails loadUserByUsername(@PathVariable String email) {
        try {
            UserDetails userDetails = customerService.loadUserByUsername(email);
            System.out.println("Loaded user: " + userDetails.getUsername() + " with authorities: " + userDetails.getAuthorities());
            return userDetails;
        } catch (UsernameNotFoundException e) {
            System.out.println("User not found: " + email);
            return null; // Return null or an error response depending on your preference
        }
    }

}