package com.coderdot.controllers;

import com.coderdot.dto.HelloResponse;
import com.coderdot.entities.Classe;
import com.coderdot.services.ClasseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/noToken/")
public class HelloController {
    @Autowired
    private ClasseService classeService;
    @GetMapping
    public List<Classe> listerClasses() {
        return classeService.listerClasses();
    }
}
