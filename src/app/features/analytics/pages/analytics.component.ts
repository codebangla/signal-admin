import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatChipsModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p class="text-gray-600">Comprehensive analytics and insights</p>
        </div>
        <div class="flex space-x-2">
          <mat-form-field appearance="outline" class="w-48">
            <mat-label>Time Period</mat-label>
            <mat-select value="30">
              <mat-option value="7">Last 7 days</mat-option>
              <mat-option value="30">Last 30 days</mat-option>
              <mat-option value="90">Last 90 days</mat-option>
            </mat-select>
          </mat-form-field>
          <button mat-raised-button color="primary">
            <mat-icon>download</mat-icon>
            Export
          </button>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <mat-card class="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <mat-card-content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold">Page Views</h3>
                <p class="text-3xl font-bold">45,678</p>
                <p class="text-sm opacity-90">+15% from last month</p>
              </div>
              <mat-icon class="text-4xl opacity-80">visibility</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <mat-card-content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold">Unique Visitors</h3>
                <p class="text-3xl font-bold">12,345</p>
                <p class="text-sm opacity-90">+8% from last month</p>
              </div>
              <mat-icon class="text-4xl opacity-80">person</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <mat-card-content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold">Bounce Rate</h3>
                <p class="text-3xl font-bold">23.5%</p>
                <p class="text-sm opacity-90">-2% from last month</p>
              </div>
              <mat-icon class="text-4xl opacity-80">trending_down</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <mat-card-content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold">Avg. Session</h3>
                <p class="text-3xl font-bold">4m 32s</p>
                <p class="text-sm opacity-90">+12% from last month</p>
              </div>
              <mat-icon class="text-4xl opacity-80">schedule</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Traffic Chart -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Traffic Overview</mat-card-title>
            <mat-card-subtitle>Daily page views and visitors</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <canvas #trafficChart width="400" height="200"></canvas>
          </mat-card-content>
        </mat-card>

        <!-- Conversion Chart -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Conversion Funnel</mat-card-title>
            <mat-card-subtitle>User journey analysis</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <canvas #conversionChart width="400" height="200"></canvas>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Detailed Analytics -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Top Pages -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Top Pages</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium">Dashboard</div>
                  <div class="text-sm text-gray-500">12,345 views</div>
                </div>
                <mat-chip color="primary" selected>45%</mat-chip>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium">User Profile</div>
                  <div class="text-sm text-gray-500">8,234 views</div>
                </div>
                <mat-chip color="accent" selected>30%</mat-chip>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium">Settings</div>
                  <div class="text-sm text-gray-500">5,123 views</div>
                </div>
                <mat-chip color="warn" selected>18%</mat-chip>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Device Analytics -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Device Analytics</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <canvas #deviceChart width="300" height="200"></canvas>
          </mat-card-content>
        </mat-card>

        <!-- Geographic Data -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Geographic Distribution</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium">United States</div>
                  <div class="text-sm text-gray-500">45% of traffic</div>
                </div>
                <mat-chip color="primary" selected>45%</mat-chip>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium">Europe</div>
                  <div class="text-sm text-gray-500">30% of traffic</div>
                </div>
                <mat-chip color="accent" selected>30%</mat-chip>
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <div class="font-medium">Asia</div>
                  <div class="text-sm text-gray-500">15% of traffic</div>
                </div>
                <mat-chip color="warn" selected>15%</mat-chip>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class AnalyticsComponent implements OnInit, AfterViewInit {
  @ViewChild('trafficChart', { static: false }) trafficChartRef!: ElementRef;
  @ViewChild('conversionChart', { static: false }) conversionChartRef!: ElementRef;
  @ViewChild('deviceChart', { static: false }) deviceChartRef!: ElementRef;

  private trafficChart: Chart | null = null;
  private conversionChart: Chart | null = null;
  private deviceChart: Chart | null = null;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initCharts();
  }

  private initCharts(): void {
    this.initTrafficChart();
    this.initConversionChart();
    this.initDeviceChart();
  }

  private initTrafficChart(): void {
    const ctx = this.trafficChartRef.nativeElement.getContext('2d');
    this.trafficChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Page Views',
          data: [1200, 1900, 3000, 5000, 2000, 3000, 4000],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4
        }, {
          label: 'Unique Visitors',
          data: [800, 1200, 2000, 3000, 1500, 2000, 2500],
          borderColor: 'rgb(147, 51, 234)',
          backgroundColor: 'rgba(147, 51, 234, 0.1)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private initConversionChart(): void {
    const ctx = this.conversionChartRef.nativeElement.getContext('2d');
    this.conversionChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Visitors', 'Engaged', 'Converted'],
        datasets: [{
          data: [10000, 6000, 2000],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(147, 51, 234, 0.8)',
            'rgba(16, 185, 129, 0.8)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }

  private initDeviceChart(): void {
    const ctx = this.deviceChartRef.nativeElement.getContext('2d');
    this.deviceChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [{
          data: [60, 35, 5],
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(147, 51, 234, 0.8)',
            'rgba(16, 185, 129, 0.8)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
} 