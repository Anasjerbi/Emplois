import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup ;

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    })
  }

  submitForm() {
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
  
        // Check if a JWT is returned in the response
        if (response.jwt != null) {
          alert("Hello, Your token is " + response.jwt);
          const jwtToken = response.jwt;
  
          // Store the JWT token in localStorage
          localStorage.setItem('jwt', jwtToken);
  
          // Navigate to the dashboard after successful login
          this.router.navigateByUrl("/list");
        } else {
          alert("Your account is still not approved");
        }
      },
      (error) => {
        // Handle error from the API call
        console.error("Login error:", error);
        alert("Your account is still not approved");
      }
    );
  }
  

}