package com.coderdot.controllers;

import com.coderdot.dto.ClasseDTO;
import com.coderdot.dto.EmploiResponse;
import com.coderdot.entities.Emploi;
import com.coderdot.services.EmploiService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/emplois")
public class EmploiController {

    private final EmploiService emploiService;

    public EmploiController(EmploiService emploiService) {
        this.emploiService = emploiService;
    }

    @PostMapping
    public ResponseEntity<Emploi> createEmploi(
            @RequestParam("nomClasse") String nomClasse,
            @RequestParam("dateDebut") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateDebut,
            @RequestParam("dateFin") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFin,
            @RequestParam("file") MultipartFile file) throws IOException {

        // Generate a unique filename to avoid overwriting
        String uniqueFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

        // Define file path
        String filePath = "uploads/" + uniqueFileName;

        // Ensure the uploads directory exists
        Path path = Paths.get(filePath);
        if (!Files.exists(path.getParent())) {
            Files.createDirectories(path.getParent()); // Create directories if they don't exist
        }

        // Save the file
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        // Create Emploi object and save it with file path
        Emploi emploi = emploiService.createEmploi(nomClasse, dateDebut, dateFin, filePath);
        return ResponseEntity.ok(emploi);
    }



    @GetMapping
    public ResponseEntity<List<EmploiResponse>> getAllEmplois() {

        return ResponseEntity.ok(emploiService.getAllEmplois());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmploi(@PathVariable Long id) {
        emploiService.deleteEmploi(id);
        return ResponseEntity.noContent().build();
    }
}
