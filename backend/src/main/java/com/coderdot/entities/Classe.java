package com.coderdot.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Classe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nomClasse;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Specialite specialite;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;
    @OneToOne(mappedBy = "classe")
    private Emploi emploi;
    @JsonIgnore
    @OneToMany(mappedBy = "classe") // `classe` is the field in the Customer entity
    private List<Customer> customers;
}