package com.coderdot.services;

import com.coderdot.dto.SignupRequest;
import com.coderdot.entities.Classe;
import com.coderdot.entities.Customer;
import com.coderdot.entities.Role;
import com.coderdot.repository.ClasseRepository;
import com.coderdot.repository.CustomerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final CustomerRepository customerRepository;
    private final ClasseRepository classeRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(CustomerRepository customerRepository,
                           ClasseRepository classeRepository,
                           PasswordEncoder passwordEncoder) {
        this.customerRepository = customerRepository;
        this.classeRepository = classeRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Customer createCustomer(SignupRequest signupRequest) {
        // Check if customer already exists
        if (customerRepository.existsByEmail(signupRequest.getEmail())) {
            return null;
        }

        Customer customer = new Customer();
        BeanUtils.copyProperties(signupRequest, customer);

        // Hash the password before saving
        String hashedPassword = passwordEncoder.encode(signupRequest.getPassword());
        customer.setPassword(hashedPassword);

        // Find the Classe by name and associate it
        if (signupRequest.getClasseName() != null) {
            Optional<Classe> classeOptional = classeRepository.findByNomClasse(signupRequest.getClasseName());
            classeOptional.ifPresent(customer::setClasse);
        }

        // Set default role as ETUDIANT
        customer.setRole(Role.ETUDIANT);

        // Save customer with default enable=false
        customer.setEnable(false);

        // Save and return the created customer
        return customerRepository.save(customer);
    }
}



