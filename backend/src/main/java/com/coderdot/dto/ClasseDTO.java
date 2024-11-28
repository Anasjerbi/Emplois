package com.coderdot.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ClasseDTO {
    private Long id;
    private String nomClasse;
    private String emploi;
    private Long idEmploi;
    private LocalDate dateDebut;
    private LocalDate dateFin;
}
