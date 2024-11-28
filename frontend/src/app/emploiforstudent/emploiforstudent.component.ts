import { Component } from '@angular/core';
import { JwtService } from '../service/jwt.service';

@Component({
  selector: 'app-emploiforstudent',
  templateUrl: './emploiforstudent.component.html',
  styleUrls: ['./emploiforstudent.component.css']
})
export class EmploiforstudentComponent {
  username: string | null = null;
  user: any;
  nomClasse: string | null = null;
  dateDebut: string | null = null;
  dateFin: string | null = null;
  emploi: any = null;  // New property to hold the emploi data

  constructor(private authService: JwtService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      console.log("🚀 ~ EmploiforstudentComponent ~ ngOnInit ~ this.user:", this.user);
      this.username = this.user.name;
      if (this.user.classe) {
        this.nomClasse = this.user.classe.nomClasse;
        this.dateDebut = this.formatDate(this.user.classe.dateDebut);
        this.dateFin = this.formatDate(this.user.classe.dateFin);
        this.emploi = this.user.classe.emploi; // Set emploi data from the user object
        console.log("🚀 ~ EmploiforstudentComponent ~ ngOnInit ~ this.emploi:", this.emploi); // Log emploi to check if it exists
      }
    }
  }
  

  formatDate(date: string): string {
    const d = new Date(date);
    return d.toLocaleDateString();  // This will return the date in a readable format (e.g., 'MM/DD/YYYY')
  }
}


