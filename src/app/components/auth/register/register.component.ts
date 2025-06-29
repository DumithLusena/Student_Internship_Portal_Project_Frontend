import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserRole } from '../../../model/user';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm: FormGroup;
  loading = false;
  error = '';
  success = '';
  userRoles = Object.values(UserRole);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      companyName: [''],
      course: [''],
      institution: [''],
      phone: ['']
    });

    // Watch role changes to show/hide conditional fields
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      this.updateValidators(role);
    });
  }

  updateValidators(role: UserRole): void {
    const companyNameControl = this.registerForm.get('companyName');
    const courseControl = this.registerForm.get('course');
    const institutionControl = this.registerForm.get('institution');

    // Reset validators
    companyNameControl?.clearValidators();
    courseControl?.clearValidators();
    institutionControl?.clearValidators();

    if (role === UserRole.COMPANY) {
      companyNameControl?.setValidators([Validators.required]);
    } else if (role === UserRole.STUDENT) {
      courseControl?.setValidators([Validators.required]);
      institutionControl?.setValidators([Validators.required]);
    }

    companyNameControl?.updateValueAndValidity();
    courseControl?.updateValueAndValidity();
    institutionControl?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';
      this.success = '';

      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.loading = false;
          this.success = 'Registration successful! Please login.';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.loading = false;
          this.error = err.error || 'Registration failed';
        }
      });
    }
  }

  get selectedRole(): UserRole {
    return this.registerForm.get('role')?.value;
  }
}
