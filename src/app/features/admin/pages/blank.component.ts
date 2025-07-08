import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="space-y-6">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Blank Page</mat-card-title>
          <mat-card-subtitle>This is a blank page for testing purposes</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="text-center py-12">
            <mat-icon class="text-6xl text-gray-400 mb-4">insert_drive_file</mat-icon>
            <h2 class="text-2xl font-semibold text-gray-600 mb-2">Blank Page</h2>
            <p class="text-gray-500 mb-6">This page is intentionally left blank for your content.</p>
            <button mat-raised-button color="primary">
              <mat-icon>add</mat-icon>
              Add Content
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class BlankComponent {} 