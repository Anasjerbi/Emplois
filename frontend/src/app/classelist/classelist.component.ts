import { Component, OnInit } from '@angular/core';
import { ClasseService } from '../service/classe.service';

@Component({
  selector: 'app-classelist',
  templateUrl: './classelist.component.html',
  styleUrls: ['./classelist.component.css']
})
export class ClasselistComponent implements OnInit {
  types: string[] =[
    "DSI", "MDW", "RSI", "SEM", "SEA", "EIPO", "MCTR", "ALII", "ECLT", "ASI", "BAT", "ARCH", "BLD"
  ];
  classes: any[] = [];
  newClasse = { nomClasse: '', specialite: '', type: '' };  // Model for adding a new class
  isEditing = false;
  editingClasse: any = null;

  constructor(private classeService: ClasseService) { }

  ngOnInit(): void {
    this.loadClasses();
  }

  // Load classes from the API
  loadClasses(): void {
    this.classeService.getClasses().subscribe(data => {
      this.classes = data;
    });
  }

  // Add new class
  addClasse(): void {
    if (this.newClasse.nomClasse && this.newClasse.specialite && this.newClasse.type) {
      this.classeService.addClasse(this.newClasse).subscribe(() => {
        this.loadClasses();  // Refresh the list after adding
        this.newClasse = { nomClasse: '', specialite: '', type: '' };  // Reset form
      });
    }
  }

  // Start editing a class
  editClasse(classe: any): void {
    this.isEditing = true;
    this.editingClasse = { ...classe };  // Clone the class data
  }

  // Save the edited class
  saveClasse(): void {
    if (this.editingClasse) {
      this.classeService.updateClasse(this.editingClasse.id, this.editingClasse).subscribe(() => {
        this.loadClasses();  // Refresh the list after editing
        this.isEditing = false;
        this.editingClasse = null;  // Reset editing
      });
    }
  }

  // Delete a class
  deleteClasse(id: number): void {
    if (confirm('Are you sure you want to delete this class?')) {
      this.classeService.deleteClasse(id).subscribe(() => {
        this.loadClasses();  // Refresh the list after deletion
      });
    }
  }
}


