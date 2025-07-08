import { Component, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthService } from '../../core/services/auth.service';
import { AutoFocusDirective } from '../../shared/directives/auto-focus.directive';
import { CapitalizePipe } from '../../shared/pipes/capitalize.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatCheckboxModule,
    AutoFocusDirective,
    CapitalizePipe
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <div class="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
            <mat-icon class="text-2xl text-primary-600">lock</mat-icon>
          </div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {{ 'sign in to your account' | capitalize }}
          </h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Or
            <a routerLink="/auth/signup" class="font-medium text-primary-600 hover:text-primary-500">
              create a new account
            </a>
          </p>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <div class="space-y-4">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Email address</mat-label>
              <input matInput type="email" formControlName="email" required autocomplete="email" appAutoFocus>
              <mat-icon matSuffix>email</mat-icon>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">Email is required</mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">Please enter a valid email address</mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" required autocomplete="current-password">
              <mat-icon matSuffix>lock</mat-icon>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">Password is required</mat-error>
              <mat-error *ngIf="loginForm.get('password')?.hasError('minlength')">Password must be at least 6 characters</mat-error>
            </mat-form-field>
          </div>

          <div class="flex items-center justify-between">
            <mat-checkbox formControlName="rememberMe" color="primary">
              Remember me
            </mat-checkbox>
            <a href="#" class="text-sm text-primary-600 hover:text-primary-500">
              Forgot your password?
            </a>
          </div>

          <button 
            mat-raised-button 
            color="primary" 
            type="submit"
            class="w-full h-12 text-lg font-medium"
            [disabled]="loginForm.invalid || loading()"
          >
            <mat-icon *ngIf="loading()" class="animate-spin mr-2">refresh</mat-icon>
            Sign In
          </button>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading.set(true);

      const credentials = this.loginForm.value;
      
      // Use mock login for development
      this.authService.mockLogin(credentials.email, credentials.password)
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.loading.set(false);
            const errorMessage = error?.message || 'Login failed. Please try again.';
            this.snackBar.open(errorMessage, 'Close', { duration: 3000 });
            console.error('Login error:', error);
          }
        });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
} 