package com.coderdot.controllers;

import com.coderdot.dto.ChangePasswordRequest;
import com.coderdot.entities.Customer;
import com.coderdot.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request) {
        Customer user =profileService.changePassword(request);
        return ResponseEntity.ok(user);
    }

}
