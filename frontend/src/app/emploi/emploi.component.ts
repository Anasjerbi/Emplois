import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmploiService } from '../service/emploi.service';
import { ClasseService } from '../service/classe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emploi',
  templateUrl: './emploi.component.html',
  styleUrls: ['./emploi.component.css']
})
export class EmploiComponent implements OnInit {

  emploiForm!: FormGroup;
  filteredClasses: any[] = [];  // List of classes without emploi data
  emplois: any[] = []; 
  classes: any[] = [];  // List of classes fetched from API
  constructor(
    private fb: FormBuilder,
    private emploiService: EmploiService,
    private classeService: ClasseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClasses();
    this.loadEmplois(); 

    // Initialize the form group
    this.emploiForm = this.fb.group({
      
      dateDebut: ['', [Validators.required]],
      dateFin: ['', [Validators.required]],
      classeName: ['', Validators.required],
      file: [null, Validators.required]
    });
  }

  // Load classes from the API
  loadClasses(): void {
    this.classeService.getClasses().subscribe(data => {
      this.classes = data;
      // Filter classes to remove those that already have an associated emploi
      this.filteredClasses = this.classes.filter(classe => !classe.emploi);
    });
  }

  // Submit form to create a new Emploi
  submitForm(): void {
    if (this.emploiForm.valid ) {
      const formData = new FormData();
   
      formData.append('dateDebut', this.emploiForm.get('dateDebut')?.value);
      formData.append('dateFin', this.emploiForm.get('dateFin')?.value);
      formData.append('nomClasse', this.emploiForm.get('classeName')?.value);
      formData.append('file', this.emploiForm.get('file')?.value);

      this.emploiService.createEmploi(formData).subscribe(() => {
        alert('Emploi added successfully!');
        this.router.navigate(['/emplois']);
      });
    } else {
      alert('Please fill in all the required fields.');
    }
  }


//handle file
onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  this.emploiForm.patchValue({
    file: file // Update the 'file' control value in the form
  });
}
deleteEmploi(id: number): void {
  if (confirm('Are you sure you want to delete this emploi?')) {
    this.emploiService.deleteEmploi(id).subscribe(() => {
      this.loadEmplois();  // Refresh the list after deletion
    });
  }
}
loadEmplois(): void {
  this.emploiService.getEmplois().subscribe(data => {
    this.emplois = data;
  });
}



}