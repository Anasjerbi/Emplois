import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';
import {jwtDecode} from 'jwt-decode'; // Ensure jwt-decode is imported correctly

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Ensure proper validators
      password: ['', Validators.required],
    });
  }

  submitForm() {
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
        if (response.jwt != null) {
          const jwtToken = response.jwt;

          // Store the JWT token in localStorage
          localStorage.setItem('jwt', jwtToken);
          localStorage.setItem('user', JSON.stringify(response.user));


          try {
            // Decode the token to extract roles
            const decodedToken: any = jwtDecode(jwtToken);
            const roles = decodedToken.roles || []; // Extract roles safely
          
            if (roles.includes('ROLE_ADMIN')) {
              this.router.navigateByUrl('/list'); // Redirect to admin page
            } else if (roles.includes('ROLE_ETUDIANT')) {
              this.router.navigateByUrl('/emploiss'); // Redirect to student page
            } else {
              alert('Role not recognized. Please contact support.');
            }
          } catch (error) {
            console.error('Error decoding token:', error);
            alert('Invalid token. Please try again.');
          }
        } else {
          alert('Your account is still not approved.');
        }
      },
      (error) => {
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials or contact support.');
      }
    );
  }
}
