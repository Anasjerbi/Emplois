import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8098/api/emplois";  // Change this to the correct URL for your Emploi API

@Injectable({
  providedIn: 'root'
})
export class EmploiService {

  private token = localStorage.getItem('jwt');

  constructor(private http: HttpClient) { }

  // Set the Authorization header with the JWT token if available
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }

  // Create a new Emploi
  createEmploi(formData: FormData): Observable<any> {
    return this.http.post<any>(BASE_URL, formData, { headers: this.getHeaders() });
  }

  // Fetch all Emplois (optional)
  getEmplois(): Observable<any[]> {
    return this.http.get<any[]>(BASE_URL, { headers: this.getHeaders() });
  }
  deleteEmploi(id: number): Observable<any> {
    const url = `${BASE_URL}/${id}`;
    return this.http.delete<any>(url, { headers: this.getHeaders() });
  }
}
