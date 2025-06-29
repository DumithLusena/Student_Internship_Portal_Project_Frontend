import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserRole } from '../../../model/user';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.loading = false;
          switch (response.user.role) {
            case UserRole.ADMIN:
              this.router.navigate(['/admin/dashboard']);
              break;
            case UserRole.COMPANY:
              this.router.navigate(['/company/dashboard']);
              break;
            case UserRole.STUDENT:
              this.router.navigate(['/student/dashboard']);
              break;
          }
        },
        error: (err) => {
          this.loading = false;
          this.error = err.error || 'Login failed';
        }
      });
    }
  }
}
