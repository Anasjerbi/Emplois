package com.coderdot.services;

import com.coderdot.entities.Classe;
import com.coderdot.entities.Specialite;
import com.coderdot.entities.Type;
import com.coderdot.repository.ClasseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class ClasseService {

    @Autowired
    private ClasseRepository classeRepository;

    public Classe ajouterClasse(Classe classe) {
        validateType(classe);
        return classeRepository.save(classe);
    }

    public Classe modifierClasse(Long id, Classe updatedClasse) {
        Classe classe = classeRepository.findById(id).orElseThrow(() -> new RuntimeException("Classe non trouvée"));
        validateType(updatedClasse);
        classe.setNomClasse(updatedClasse.getNomClasse());
        classe.setSpecialite(updatedClasse.getSpecialite());
        classe.setType(updatedClasse.getType());
        return classeRepository.save(classe);
    }

    public void supprimerClasse(Long id) {
        classeRepository.deleteById(id);
    }

    public List<Classe> listerClasses() {
        return classeRepository.findAll();
    }

    private void validateType(Classe classe) {
        Specialite specialite = classe.getSpecialite();
        Type type = classe.getType();

        if (!type.getSpecialite().equalsIgnoreCase(specialite.name())) {
            throw new IllegalArgumentException("Type invalide pour la spécialité " + specialite +
                    ". Types valides : " + getValidTypes(specialite));
        }
    }

    private List<Type> getValidTypes(Specialite specialite) {
        return Arrays.stream(Type.values())
                .filter(type -> type.getSpecialite().equalsIgnoreCase(specialite.name()))
                .toList();
    }
    public long countClasses() {
        return classeRepository.count(); // Efficiently count rows in the table
    }
}
