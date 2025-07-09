import { Component, signal } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AuthService } from "../../core/services/auth.service";
import { CapitalizePipe } from "../../shared/pipes/capitalize.pipe";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatCheckboxModule,
    CapitalizePipe,
  ],
  template: `
    <div class="">
      <div class="">
        <div>
         
          <h2 class="">
            {{ "sign in to your account" | capitalize }}
          </h2>
          <p class="">
            Or
            <a routerLink="/auth/signup" class=""> create a new account </a>
          </p>
        </div>

        <form
          [formGroup]="loginForm"
          (ngSubmit)="onSubmit()"
          class="">
          
          <mat-form-field class="w-full">
            <mat-label>Email</mat-label>
            <input 
              type="email" 
              matInput 
              [formControl]="emailFormControl" 
              placeholder="Ex. pat@example.com"
              autocomplete="email">
            @if (emailFormControl.hasError('email') && !emailFormControl.hasError('required')) {
              <mat-error>Please enter a valid email address</mat-error>
            }
            @if (emailFormControl.hasError('required')) {
              <mat-error>Email is <strong>required</strong></mat-error>
            }
          </mat-form-field>

          <mat-form-field class="w-full">
            <mat-label>Password</mat-label>
            <input
              matInput
              type="password"
              [formControl]="passwordFormControl"
              required
              autocomplete="current-password" />
            <mat-icon matSuffix>lock</mat-icon>
            @if (passwordFormControl.hasError('required')) {
              <mat-error>Password is required</mat-error>
            }
            @if (passwordFormControl.hasError('minlength')) {
              <mat-error>Password must be at least 6 characters</mat-error>
            }
          </mat-form-field>

          <div class="flex items-center justify-between">
            <mat-checkbox [formControl]="rememberMeFormControl" color="primary">
              Remember me
            </mat-checkbox>
            <a href="#" class=""> Forgot your password? </a>
          </div>

          <button
            mat-raised-button
            color="primary"
            type="submit"
            class=""
            [disabled]="loginForm.invalid || loading()">
            @if (loading()) {
              <mat-icon class="animate-spin mr-2">refresh</mat-icon>
            }
            Sign In
          </button>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  rememberMeFormControl = new FormControl(false);
  
  loginForm: FormGroup;
  loading = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: this.emailFormControl,
      password: this.passwordFormControl,
      rememberMe: this.rememberMeFormControl,
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading.set(true);

      const credentials = this.loginForm.value;

      // Use mock login for development
      this.authService
        .mockLogin(credentials.email, credentials.password)
        .subscribe({
          next: () => {
            this.loading.set(false);
            this.router.navigate(["/dashboard"]);
          },
          error: (error) => {
            this.loading.set(false);
            const errorMessage =
              error?.message || "Login failed. Please try again.";
            this.snackBar.open(errorMessage, "Close", { duration: 3000 });
            console.error("Login error:", error);
          },
        });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }
}