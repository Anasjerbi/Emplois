package com.coderdot.services;

import com.coderdot.dto.ClasseDTO;
import com.coderdot.dto.EmploiResponse;
import com.coderdot.entities.Classe;
import com.coderdot.entities.Emploi;
import com.coderdot.repository.ClasseRepository;
import com.coderdot.repository.EmploiRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmploiService {

    private final EmploiRepository emploiRepository;
    private final ClasseRepository classeRepository;

    public EmploiService(EmploiRepository emploiRepository, ClasseRepository classeRepository) {
        this.emploiRepository = emploiRepository;
        this.classeRepository = classeRepository;
    }

    public Emploi createEmploi(String className, LocalDate dateDebut, LocalDate dateFin, String filePath) {
        // Fetch the Classe by its name
        Optional<Classe> optionalClasse = classeRepository.findByNomClasse(className);

        if (optionalClasse.isEmpty()) {
            throw new IllegalArgumentException("Classe with name " + className + " not found");
        }

        Classe classe = optionalClasse.get(); // Retrieve the Classe if present

        Emploi emploi = new Emploi();
        emploi.setClasse(classe); // Set the selected Classe
        emploi.setDateDebut(dateDebut);
        emploi.setDateFin(dateFin);
        emploi.setFilePath(filePath);

        return emploiRepository.save(emploi);
    }


    public List<EmploiResponse> getAllEmplois() {
        List<Emploi> emplois = emploiRepository.findAll(); // Retrieve all emplois
        return emplois.stream()
                .map(emploi -> {
                    EmploiResponse emploiDTO = new EmploiResponse();
                    emploiDTO.setId(emploi.getId());
                    emploiDTO.setDateDebut(emploi.getDateDebut());
                    emploiDTO.setDateFin(emploi.getDateFin());
                    emploiDTO.setFilePath(emploi.getFilePath());
                    // Map the associated Classe to ClasseDTO
                    ClasseDTO classeDTO = new ClasseDTO();
                    classeDTO.setId(emploi.getClasse().getId());
                    classeDTO.setNomClasse(emploi.getClasse().getNomClasse());
                    emploiDTO.setClasse(classeDTO);

                    return emploiDTO;
                })
                .collect(Collectors.toList());
    }

    public void deleteEmploi(Long id) {
        emploiRepository.deleteById(id);
    }

    public Emploi updateEmploi(Long id, String className, LocalDate dateDebut, LocalDate dateFin, String filePath) {
        Emploi existingEmploi = emploiRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Emploi with ID " + id + " not found"));

        Optional<Classe> optionalClasse = classeRepository.findByNomClasse(className);
        if (optionalClasse.isEmpty()) {
            throw new IllegalArgumentException("Classe with name " + className + " not found");
        }

        existingEmploi.setClasse(optionalClasse.get());
        existingEmploi.setDateDebut(dateDebut);
        existingEmploi.setDateFin(dateFin);
        if (filePath != null) {
            existingEmploi.setFilePath(filePath);
        }

        return emploiRepository.save(existingEmploi);
    }


}

