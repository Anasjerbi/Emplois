import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtService } from '../service/jwt.service';
import { Router } from '@angular/router';
import { ClasseService } from '../service/classe.service';


@Component({
    selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup;
  classes: any[] = [];

  constructor(
    private service: JwtService,
    private fb: FormBuilder,
    private router: Router,
    private classeService: ClasseService
  ) { }

  // Load classes from the API
  loadClasses(): void {
    this.classeService.getClasses().subscribe(data => {
      this.classes = data;
    });
  }

  ngOnInit(): void {
    this.loadClasses();

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      classeName: ['', Validators.required],
    }, { validator: this.passwordMathValidator })
  }

  passwordMathValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    if (password != confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  submitForm() {
    console.log(this.registerForm.value);
    this.service.register(this.registerForm.value).subscribe(
      (response) => {
        if (response.id != null) {
          alert("Signup Successfully !" );
          this.router.navigate(['/login']);
        }
      }
    )
  }

}