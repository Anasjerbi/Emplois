package com.coderdot.controllers;

import com.coderdot.dto.ClasseDTO;
import com.coderdot.dto.LoginRequest;
import com.coderdot.dto.LoginResponse;
import com.coderdot.dto.UserResponse;
import com.coderdot.entities.Classe;
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
        LoginResponse response = new LoginResponse();
        UserResponse userResponse = new UserResponse();
        ClasseDTO classeDTO=new ClasseDTO();
        try {
            // Find the customer by email
            Optional<Customer> customerOptional = customerRepository.findByEmail(loginRequest.getEmail());

            if (customerOptional.isPresent()) {
                Customer customer = customerOptional.get();

                // Check if the user is enabled
                if (!customer.isEnable()) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .body(new LoginResponse("User not enabled", new UserResponse()));
                }

                // Perform authentication
                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginRequest.getEmail(),
                                loginRequest.getPassword()
                        )
                );

                // If authentication is successful, log user and generate token
                logger.info("User authenticated successfully: " + loginRequest.getEmail());
                String jwtToken = jwtUtil.generateToken(authentication.getName(), authentication.getAuthorities());

                // Populate userResponse after successful authentication
                userResponse.setEmail(customer.getEmail());
                userResponse.setId(customer.getId());
                userResponse.setName(customer.getName());
                userResponse.setRole(customer.getRole());
                if(customer.getClasse()!= null){
                classeDTO.setNomClasse(customer.getClasse().getNomClasse());
                classeDTO.setId(customer.getClasse().getId());
                if (customer.getClasse().getEmploi()!= null) {
                    classeDTO.setEmploi(customer.getClasse().getEmploi().getFilePath());
                    classeDTO.setDateDebut(customer.getClasse().getEmploi().getDateDebut());
                    classeDTO.setDateFin(customer.getClasse().getEmploi().getDateFin());
                    classeDTO.setIdEmploi(customer.getClasse().getEmploi().getId());
                }

                userResponse.setClasse(classeDTO);}

                // Set the response with JWT and user details
                response.setJwt(jwtToken);
                response.setUser(userResponse);

                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new LoginResponse("User not found", new UserResponse()));
            }
        } catch (BadCredentialsException e) {
            logger.error("Authentication failed for user: " + loginRequest.getEmail(), e);
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new LoginResponse("Invalid credentials", new UserResponse()));
        }
    }
}