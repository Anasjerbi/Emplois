package com.coderdot.controllers;

import com.coderdot.entities.Classe;
import com.coderdot.services.ClasseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/classes")
public class ClasseController {

    @Autowired
    private ClasseService classeService;

    @PostMapping
    public Classe ajouterClasse(@RequestBody Classe classe) {
        return classeService.ajouterClasse(classe);
    }

    @PutMapping("/{id}")
    public Classe modifierClasse(@PathVariable Long id, @RequestBody Classe updatedClasse) {
        return classeService.modifierClasse(id, updatedClasse);
    }

    @DeleteMapping("/{id}")
    public void supprimerClasse(@PathVariable Long id) {
        classeService.supprimerClasse(id);
    }


}
