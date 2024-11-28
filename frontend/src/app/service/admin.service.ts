import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = "http://localhost:8098"; 

@Injectable({
  providedIn: 'root'
})
export class AdminService {
   token =localStorage.getItem("jwt") ;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // Return headers with the token if it exists
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }

  approveCustomer(id: number): Observable<any> {
    return this.http.put(`${BASE_URL}/admin/approve/${id}`, null, { headers: this.getHeaders() });
  }

  disapproveCustomer(id: number): Observable<any> {
    return this.http.put(`${BASE_URL}/admin/disapprove/${id}`, null, { headers: this.getHeaders() });
  }

  listCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${BASE_URL}/admin/listStudents`, { headers: this.getHeaders() });
  }
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/admin/deleteUser/${id}`, { headers: this.getHeaders() });
  }
  countCustomers(): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/admin/countCustomers`,{ headers: this.getHeaders() });
  }
  countClasses(): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/api/classes/countClasses`,{ headers: this.getHeaders() });
  }
  
}