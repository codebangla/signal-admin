import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatCardModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="flex justify-center">
          <h1 class="text-3xl font-bold text-gray-900">Signal Admin</h1>
        </div>
      </div>
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <mat-card class="p-8">
          <router-outlet></router-outlet>
        </mat-card>
      </div>
    </div>
  `
})
export class AuthLayoutComponent {} 