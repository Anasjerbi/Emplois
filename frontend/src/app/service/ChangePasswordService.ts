import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  private apiUrl = 'http://localhost:8098/api/profile/changePassword'; // Update with actual endpoint
  token =localStorage.getItem("jwt") ;
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
    return headers;
  }
  constructor(private http: HttpClient) {}

  changePassword(request: any): Observable<any> {
    return this.http.post(this.apiUrl, request, { headers: this.getHeaders() });
  }
}
