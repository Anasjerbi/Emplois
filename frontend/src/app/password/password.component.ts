import { Component } from '@angular/core';
import { ChangePasswordService } from '../service/ChangePasswordService';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  changePasswordRequest = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    email: '',
  };
  errorMessage: string | null = null;

  constructor(private changePasswordService: ChangePasswordService) {
    this.setEmailFromToken();
  }

  private setEmailFromToken(): void {
    const token = localStorage.getItem('jwt'); // Adjust based on your storage key
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.changePasswordRequest.email = decodedToken.sub; // 'sub' contains the email
    } else {
      this.errorMessage = 'No token found. Please log in again.';
    }
  }

  onChangePassword(): void {
    this.changePasswordService.changePassword(this.changePasswordRequest).subscribe({
      next: (response) => {
        alert('Password changed successfully!');
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'An error occurred.';
      },
    });
  }

}
