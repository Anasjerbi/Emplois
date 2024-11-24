package com.coderdot.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Emploi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // One-to-One relationship with Classe
    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "classe_id", referencedColumnName = "id")  // Foreign key to Classe
    private Classe classe; // Single Classe object

    @Column(name = "date_debut", nullable = false)
    private LocalDate dateDebut;

    @Column(name = "date_fin", nullable = false)
    private LocalDate dateFin;

    @Column(name = "file_path", nullable = false)
    private String filePath;
}
