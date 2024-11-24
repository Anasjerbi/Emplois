package com.coderdot.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EmploiResponse {
    private Long id;
    private LocalDate dateDebut;
    private LocalDate dateFin;
    private String filePath;
    private ClasseDTO classe;
}
