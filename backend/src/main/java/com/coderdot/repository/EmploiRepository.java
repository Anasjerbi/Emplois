package com.coderdot.repository;

import com.coderdot.entities.Classe;
import com.coderdot.entities.Emploi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmploiRepository extends JpaRepository<Emploi, Long> {
    // You can add custom queries if needed, for example:
    // List<Emploi> findByClasse(Classe classe);


}