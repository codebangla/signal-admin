import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatMenuModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Reports</h1>
          <p class="text-gray-600">Generate and view detailed reports</p>
        </div>
        <div class="flex space-x-2">
          <button mat-raised-button color="primary">
            <mat-icon>add</mat-icon>
            New Report
          </button>
          <button mat-raised-button>
            <mat-icon>download</mat-icon>
            Export All
          </button>
        </div>
      </div>

      <!-- Report Types -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <mat-card class="cursor-pointer hover:shadow-lg transition-shadow">
          <mat-card-content class="p-6 text-center">
            <mat-icon class="text-4xl text-blue-500 mb-4">assessment</mat-icon>
            <h3 class="text-lg font-semibold mb-2">Sales Report</h3>
            <p class="text-sm text-gray-600 mb-4">Monthly sales performance and trends</p>
            <button mat-raised-button color="primary" class="w-full">Generate</button>
          </mat-card-content>
        </mat-card>

        <mat-card class="cursor-pointer hover:shadow-lg transition-shadow">
          <mat-card-content class="p-6 text-center">
            <mat-icon class="text-4xl text-green-500 mb-4">people</mat-icon>
            <h3 class="text-lg font-semibold mb-2">User Report</h3>
            <p class="text-sm text-gray-600 mb-4">User activity and demographics</p>
            <button mat-raised-button color="primary" class="w-full">Generate</button>
          </mat-card-content>
        </mat-card>

        <mat-card class="cursor-pointer hover:shadow-lg transition-shadow">
          <mat-card-content class="p-6 text-center">
            <mat-icon class="text-4xl text-purple-500 mb-4">analytics</mat-icon>
            <h3 class="text-lg font-semibold mb-2">Analytics Report</h3>
            <p class="text-sm text-gray-600 mb-4">Website traffic and engagement</p>
            <button mat-raised-button color="primary" class="w-full">Generate</button>
          </mat-card-content>
        </mat-card>

        <mat-card class="cursor-pointer hover:shadow-lg transition-shadow">
          <mat-card-content class="p-6 text-center">
            <mat-icon class="text-4xl text-orange-500 mb-4">trending_up</mat-icon>
            <h3 class="text-lg font-semibold mb-2">Performance Report</h3>
            <p class="text-sm text-gray-600 mb-4">System performance metrics</p>
            <button mat-raised-button color="primary" class="w-full">Generate</button>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Filters -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Report Filters</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Report Type</mat-label>
              <mat-select>
                <mat-option value="sales">Sales Report</mat-option>
                <mat-option value="users">User Report</mat-option>
                <mat-option value="analytics">Analytics Report</mat-option>
                <mat-option value="performance">Performance Report</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Date Range</mat-label>
              <mat-select>
                <mat-option value="7">Last 7 days</mat-option>
                <mat-option value="30">Last 30 days</mat-option>
                <mat-option value="90">Last 90 days</mat-option>
                <mat-option value="custom">Custom Range</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Format</mat-label>
              <mat-select>
                <mat-option value="pdf">PDF</mat-option>
                <mat-option value="excel">Excel</mat-option>
                <mat-option value="csv">CSV</mat-option>
              </mat-select>
            </mat-form-field>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Recent Reports -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Recent Reports</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="recentReports" class="w-full">
            <!-- Report Name Column -->
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Report Name</th>
              <td mat-cell *matCellDef="let report">
                <div class="flex items-center">
                  <mat-icon class="mr-3 text-blue-500">description</mat-icon>
                  <div>
                    <div class="font-medium">{{report.name}}</div>
                    <div class="text-sm text-gray-500">{{report.description}}</div>
                  </div>
                </div>
              </td>
            </ng-container>

            <!-- Type Column -->
            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef>Type</th>
              <td mat-cell *matCellDef="let report">
                <mat-chip [color]="getChipColor(report.type)" selected>
                  {{report.type}}
                </mat-chip>
              </td>
            </ng-container>

            <!-- Date Column -->
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Generated</th>
              <td mat-cell *matCellDef="let report">{{report.date}}</td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let report">
                <mat-chip [color]="report.status === 'Completed' ? 'primary' : 'warn'" selected>
                  {{report.status}}
                </mat-chip>
              </td>
            </ng-container>

            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let report">
                <button mat-icon-button [matMenuTriggerFor]="menu">
                  <mat-icon>more_vert</mat-icon>
                </button>
                <mat-menu #menu="matMenu">
                  <button mat-menu-item>
                    <mat-icon>download</mat-icon>
                    <span>Download</span>
                  </button>
                  <button mat-menu-item>
                    <mat-icon>share</mat-icon>
                    <span>Share</span>
                  </button>
                  <button mat-menu-item>
                    <mat-icon>delete</mat-icon>
                    <span>Delete</span>
                  </button>
                </mat-menu>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>

          <mat-paginator [pageSizeOptions]="[5, 10, 25]" showFirstLastButtons></mat-paginator>
        </mat-card-content>
      </mat-card>

      <!-- Scheduled Reports -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Scheduled Reports</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center">
                <mat-icon class="mr-3 text-green-500">schedule</mat-icon>
                <div>
                  <div class="font-medium">Weekly Sales Report</div>
                  <div class="text-sm text-gray-500">Every Monday at 9:00 AM</div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <mat-chip color="primary" selected>Active</mat-chip>
                <button mat-icon-button>
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button>
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center">
                <mat-icon class="mr-3 text-blue-500">schedule</mat-icon>
                <div>
                  <div class="font-medium">Monthly User Report</div>
                  <div class="text-sm text-gray-500">First day of each month at 8:00 AM</div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <mat-chip color="primary" selected>Active</mat-chip>
                <button mat-icon-button>
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button>
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class ReportsComponent {
  displayedColumns: string[] = ['name', 'type', 'date', 'status', 'actions'];
  
  recentReports = [
    {
      name: 'Sales Report - January 2024',
      description: 'Monthly sales performance analysis',
      type: 'Sales',
      date: '2024-01-31',
      status: 'Completed'
    },
    {
      name: 'User Activity Report',
      description: 'User engagement and demographics',
      type: 'Users',
      date: '2024-01-30',
      status: 'Completed'
    },
    {
      name: 'Website Analytics Report',
      description: 'Traffic and conversion analysis',
      type: 'Analytics',
      date: '2024-01-29',
      status: 'Processing'
    },
    {
      name: 'Performance Report',
      description: 'System performance metrics',
      type: 'Performance',
      date: '2024-01-28',
      status: 'Completed'
    }
  ];

  getChipColor(type: string): string {
    switch (type) {
      case 'Sales': return 'primary';
      case 'Users': return 'accent';
      case 'Analytics': return 'warn';
      case 'Performance': return 'primary';
      default: return 'primary';
    }
  }
} 