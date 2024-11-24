import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8098/api"; 

@Injectable({
  providedIn: 'root'
})
export class ClasseService {
  token =localStorage.getItem("jwt") ;
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }
  private apiUrl = `${BASE_URL}/classes`; 

  constructor(private http: HttpClient) { }

  // Fetch all classes
  getClasses(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:8098/noToken/");
  }

  // Add a new class
  addClasse(classe: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, classe, { headers: this.getHeaders() });
  }

  // Update an existing class
  updateClasse(id: number, classe: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, classe,{ headers: this.getHeaders() });
  }

  // Delete a class
  deleteClasse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`,{ headers: this.getHeaders() });
  }
}
