package com.coderdot.controllers;

import com.coderdot.dto.LoginRequest;
import com.coderdot.dto.LoginResponse;
import com.coderdot.entities.Customer;
import com.coderdot.repository.CustomerRepository;
import com.coderdot.services.jwt.CustomerServiceImpl;
import com.coderdot.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final AuthenticationManager authenticationManager;

    private final CustomerServiceImpl customerService;

    private final JwtUtil jwtUtil;


    private final CustomerRepository customerRepository;
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);



    @Autowired
    public LoginController(AuthenticationManager authenticationManager, CustomerServiceImpl customerService, JwtUtil jwtUtil, CustomerRepository customerRepository) {
        this.authenticationManager = authenticationManager;
        this.customerService = customerService;
        this.jwtUtil = jwtUtil;
        this.customerRepository = customerRepository;
    }

    @PostMapping("")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            Optional<Customer> customerOptional = customerRepository.findByEmail(loginRequest.getEmail());
            if(customerOptional.isPresent()) {
                Customer customer = customerOptional.get();
                if(!customer.isEnable()){
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new LoginResponse("User not enabled"));

                }

            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            // If authentication is successful, log user and generate token
            logger.info("User authenticated successfully: " + loginRequest.getEmail());
            String jwtToken = jwtUtil.generateToken(authentication.getName(), authentication.getAuthorities());
            return ResponseEntity.ok(new LoginResponse(jwtToken));
        } catch (BadCredentialsException e) {
            logger.error("Authentication failed for user: " + loginRequest.getEmail(), e);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new LoginResponse("Invalid credentials"));
        }
    }


}