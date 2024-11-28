import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  getUsernameFromToken(): string | null {
    const token = localStorage.getItem('token'); // Ensure the key is correct
    if (!token) {
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded Token:', decodedToken); // Debugging log
      return decodedToken.sub || decodedToken.username || null; // Adjust based on token structure
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
}
