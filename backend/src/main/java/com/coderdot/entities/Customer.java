package com.coderdot.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean enable ;

    private String name;
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    private String email;

    @ManyToOne
    @JoinColumn(name = "classe_id") // Foreign key for the Classe
    private Classe classe;
}
