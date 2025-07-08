import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Profile Header -->
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div class="flex items-center space-x-6">
          <div class="w-24 h-24 bg-white rounded-full flex items-center justify-center">
            <img [src]="user.avatar || 'assets/avatar-placeholder.png'" [alt]="user.name" class="w-24 h-24 rounded-full object-cover" (error)="onImageError($event)">
          </div>
          <div class="flex-1">
            <h1 class="text-3xl font-bold">John Doe</h1>
            <p class="text-xl opacity-90">Software Developer</p>
            <p class="opacity-75">john.doe&#64;example.com</p>
            <div class="flex space-x-2 mt-3">
              <mat-chip color="primary" selected>Admin</mat-chip>
              <mat-chip color="accent" selected>Verified</mat-chip>
            </div>
          </div>
          <div class="flex space-x-2">
            <button mat-raised-button class="bg-white text-blue-600">
              <mat-icon>edit</mat-icon>
              Edit Profile
            </button>
            <button mat-raised-button class="bg-white text-blue-600">
              <mat-icon>settings</mat-icon>
              Settings
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profile Information -->
        <div class="lg:col-span-2">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Profile Information</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 class="text-lg font-medium mb-4">Personal Details</h3>
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Full Name:</span>
                      <span class="font-medium">John Doe</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Email:</span>
                      <span class="font-medium">john.doe&#64;example.com</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Phone:</span>
                      <span class="font-medium">+1 (555) 123-4567</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Location:</span>
                      <span class="font-medium">San Francisco, CA</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Joined:</span>
                      <span class="font-medium">January 2023</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-medium mb-4">Professional Info</h3>
                  <div class="space-y-3">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Position:</span>
                      <span class="font-medium">Senior Developer</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Department:</span>
                      <span class="font-medium">Engineering</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Experience:</span>
                      <span class="font-medium">5+ years</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Skills:</span>
                      <span class="font-medium">Angular, React, Node.js</span>
                    </div>
                  </div>
                </div>
              </div>

              <mat-divider class="my-6"></mat-divider>

              <div>
                <h3 class="text-lg font-medium mb-4">Bio</h3>
                <p class="text-gray-700 leading-relaxed">
                  Experienced software developer with a passion for creating user-friendly web applications. 
                  Specialized in frontend development using modern frameworks like Angular and React. 
                  Always eager to learn new technologies and contribute to innovative projects.
                </p>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Activity Timeline -->
          <mat-card class="mt-6">
            <mat-card-header>
              <mat-card-title>Recent Activity</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <mat-list>
                <mat-list-item>
                  <mat-icon matListItemIcon class="text-green-500">login</mat-icon>
                  <div matListItemTitle>Logged in to the system</div>
                  <div matListItemLine>2 hours ago</div>
                </mat-list-item>
                <mat-divider></mat-divider>
                <mat-list-item>
                  <mat-icon matListItemIcon class="text-blue-500">edit</mat-icon>
                  <div matListItemTitle>Updated profile information</div>
                  <div matListItemLine>1 day ago</div>
                </mat-list-item>
                <mat-divider></mat-divider>
                <mat-list-item>
                  <mat-icon matListItemIcon class="text-purple-500">security</mat-icon>
                  <div matListItemTitle>Changed password</div>
                  <div matListItemLine>3 days ago</div>
                </mat-list-item>
                <mat-divider></mat-divider>
                <mat-list-item>
                  <mat-icon matListItemIcon class="text-orange-500">settings</mat-icon>
                  <div matListItemTitle>Updated notification preferences</div>
                  <div matListItemLine>1 week ago</div>
                </mat-list-item>
              </mat-list>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Quick Stats -->
          <mat-card>
            <mat-card-header>
              <mat-card-title>Quick Stats</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Projects</span>
                  <span class="font-bold text-blue-600">12</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Tasks Completed</span>
                  <span class="font-bold text-green-600">156</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Hours Logged</span>
                  <span class="font-bold text-purple-600">1,234</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-gray-600">Team Members</span>
                  <span class="font-bold text-orange-600">8</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Skills -->
          <mat-card>
            <mat-card-header>
              <mat-card-title>Skills</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="flex flex-wrap gap-2">
                <mat-chip color="primary" selected>Angular</mat-chip>
                <mat-chip color="accent" selected>React</mat-chip>
                <mat-chip color="warn" selected>Node.js</mat-chip>
                <mat-chip color="primary" selected>TypeScript</mat-chip>
                <mat-chip color="accent" selected>JavaScript</mat-chip>
                <mat-chip color="warn" selected>Python</mat-chip>
                <mat-chip color="primary" selected>MongoDB</mat-chip>
                <mat-chip color="accent" selected>PostgreSQL</mat-chip>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Contact Info -->
          <mat-card>
            <mat-card-header>
              <mat-card-title>Contact Information</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="space-y-3">
                <div class="flex items-center space-x-3">
                  <mat-icon class="text-gray-500">email</mat-icon>
                  <span>john.doe&#64;example.com</span>
                </div>
                <div class="flex items-center space-x-3">
                  <mat-icon class="text-gray-500">phone</mat-icon>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div class="flex items-center space-x-3">
                  <mat-icon class="text-gray-500">location_on</mat-icon>
                  <span>San Francisco, CA</span>
                </div>
                <div class="flex items-center space-x-3">
                  <mat-icon class="text-gray-500">link</mat-icon>
                  <span>linkedin.com/in/johndoe</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'assets/avatar-placeholder.png',
    role: 'Admin',
    status: 'active',
    updatedAt: new Date().toISOString()
  };

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/avatar-placeholder.png';
  }
} 