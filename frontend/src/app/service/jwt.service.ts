import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8098/"]

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();
  setUser(user: any) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.value;
  }

  clearUser() {
    this.userSubject.next(null);
  }
  constructor(private http: HttpClient) { }

  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'signup', signRequest)
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest)
  }



  private createAuhtorizationHeader() {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      )
    } else {
      console.log("JWT token not found in local storage");
    }
    return null;
  }

}