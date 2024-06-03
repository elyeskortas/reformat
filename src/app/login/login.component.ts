import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.authService.login(this.email, this.password).subscribe(
      response => {
        this.isLoading = false;
        console.log('Login successful, token:', response.success); // Log the successful login
        if (response && response.success) {
          this.router.navigate(['/dashboard']); // Redirect to a protected page
        } else {
          this.errorMessage = 'Login failed';
        }
      },
      error => {
        this.isLoading = false;
        console.log('Login error:', error); // Log the error for debugging
        this.errorMessage = 'Login failed: ' + (error.error.message || 'Unknown error');
      }
    );
  }
}
