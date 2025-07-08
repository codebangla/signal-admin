import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatIconModule, 
    MatButtonModule,
    MatProgressBarModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Info Boxes -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <mat-card class="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <mat-card-content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold">Total Users</h3>
                <p class="text-3xl font-bold">1,234</p>
                <p class="text-sm opacity-90">+12% from last month</p>
              </div>
              <mat-icon class="text-2xl opacity-80">people</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <mat-card-content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold">Revenue</h3>
                <p class="text-3xl font-bold">$45,678</p>
                <p class="text-sm opacity-90">+8% from last month</p>
              </div>
              <mat-icon class="text-2xl opacity-80">attach_money</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <mat-card-content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold">Orders</h3>
                <p class="text-3xl font-bold">567</p>
                <p class="text-sm opacity-90">+15% from last month</p>
              </div>
              <mat-icon class="text-2xl opacity-80">shopping_cart</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <mat-card-content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold">Growth</h3>
                <p class="text-3xl font-bold">+12.5%</p>
                <p class="text-sm opacity-90">+2% from last month</p>
              </div>
              <mat-icon class="text-2xl opacity-80">trending_up</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Sales Chart -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Sales Overview</mat-card-title>
            <mat-card-subtitle>Monthly sales performance</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <canvas #salesChart width="400" height="200"></canvas>
          </mat-card-content>
        </mat-card>

        <!-- Users Chart -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>User Growth</mat-card-title>
            <mat-card-subtitle>New user registrations</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <canvas #usersChart width="400" height="200"></canvas>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Progress and Activity Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Progress Cards -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Progress Overview</mat-card-title>
          </mat-card-header>
          <mat-card-content class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>Sales Target</span>
                <span>75%</span>
              </div>
              <mat-progress-bar mode="determinate" [value]="75" color="primary"></mat-progress-bar>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>User Growth</span>
                <span>60%</span>
              </div>
              <mat-progress-bar mode="determinate" [value]="60" color="accent"></mat-progress-bar>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>Revenue Goal</span>
                <span>90%</span>
              </div>
              <mat-progress-bar mode="determinate" [value]="90" color="warn"></mat-progress-bar>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Recent Activity -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Recent Activity</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-list>
              <mat-list-item>
                <mat-icon matListItemIcon class="text-green-500">person_add</mat-icon>
                <div matListItemTitle>New user registered</div>
                <div matListItemLine>John Doe joined the platform</div>
                <span class="text-xs text-gray-500">2 min ago</span>
              </mat-list-item>
              <mat-divider></mat-divider>
              <mat-list-item>
                <mat-icon matListItemIcon class="text-blue-500">shopping_cart</mat-icon>
                <div matListItemTitle>Order completed</div>
                <div matListItemLine>Order #12345 was completed</div>
                <span class="text-xs text-gray-500">5 min ago</span>
              </mat-list-item>
              <mat-divider></mat-divider>
              <mat-list-item>
                <mat-icon matListItemIcon class="text-yellow-500">payment</mat-icon>
                <div matListItemTitle>Payment received</div>
                <div matListItemLine>$1,250 payment processed</div>
                <span class="text-xs text-gray-500">10 min ago</span>
              </mat-list-item>
            </mat-list>
          </mat-card-content>
        </mat-card>

        <!-- Quick Stats -->
        <mat-card>
          <mat-card-header>
            <mat-card-title>Quick Stats</mat-card-title>
          </mat-card-header>
          <mat-card-content class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Active Users</span>
              <mat-chip color="primary" selected>1,234</mat-chip>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Total Orders</span>
              <mat-chip color="accent" selected>567</mat-chip>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Revenue</span>
              <mat-chip color="warn" selected>$45,678</mat-chip>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Growth Rate</span>
              <mat-chip color="primary" selected>+12.5%</mat-chip>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('salesChart', { static: false }) salesChartRef!: ElementRef;
  @ViewChild('usersChart', { static: false }) usersChartRef!: ElementRef;

  private salesChart: Chart | null = null;
  private usersChart: Chart | null = null;

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
    this.initSalesChart();
    this.initUsersChart();
  }

  private initSalesChart(): void {
    const ctx = this.salesChartRef.nativeElement.getContext('2d');
    this.salesChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Sales',
          data: [12, 19, 3, 5, 2, 3],
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
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

  private initUsersChart(): void {
    const ctx = this.usersChartRef.nativeElement.getContext('2d');
    this.usersChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'New Users',
          data: [65, 59, 80, 81, 56, 55],
          backgroundColor: 'rgba(147, 51, 234, 0.8)',
          borderColor: 'rgb(147, 51, 234)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
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
} 