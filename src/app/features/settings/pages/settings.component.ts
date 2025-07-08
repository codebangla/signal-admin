import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatTabsModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
          <p class="text-gray-600">Manage your account and application preferences</p>
        </div>
        <button mat-raised-button color="primary">
          <mat-icon>save</mat-icon>
          Save Changes
        </button>
      </div>

      <mat-tab-group>
        <!-- Profile Settings -->
        <mat-tab label="Profile">
          <div class="p-6">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Profile Information</mat-card-title>
                <mat-card-subtitle>Update your personal information</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <form [formGroup]="profileForm" class="space-y-4">
                  <div class="flex items-center space-x-4 mb-6">
                    <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <mat-icon class="text-3xl text-gray-500">person</mat-icon>
                    </div>
                    <div>
                      <button mat-raised-button>Change Photo</button>
                      <p class="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>First Name</mat-label>
                      <input matInput formControlName="firstName">
                    </mat-form-field>

                    <mat-form-field appearance="outline" class="w-full">
                      <mat-label>Last Name</mat-label>
                      <input matInput formControlName="lastName">
                    </mat-form-field>
                  </div>

                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Email</mat-label>
                    <input matInput type="email" formControlName="email">
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Phone</mat-label>
                    <input matInput formControlName="phone">
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Bio</mat-label>
                    <textarea matInput formControlName="bio" rows="3"></textarea>
                  </mat-form-field>
                </form>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Security Settings -->
        <mat-tab label="Security">
          <div class="p-6">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Security Settings</mat-card-title>
                <mat-card-subtitle>Manage your account security</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="space-y-6">
                  <!-- Change Password -->
                  <div>
                    <h3 class="text-lg font-medium mb-4">Change Password</h3>
                    <form [formGroup]="passwordForm" class="space-y-4">
                      <mat-form-field appearance="outline" class="w-full">
                        <mat-label>Current Password</mat-label>
                        <input matInput type="password" formControlName="currentPassword">
                      </mat-form-field>

                      <mat-form-field appearance="outline" class="w-full">
                        <mat-label>New Password</mat-label>
                        <input matInput type="password" formControlName="newPassword">
                      </mat-form-field>

                      <mat-form-field appearance="outline" class="w-full">
                        <mat-label>Confirm New Password</mat-label>
                        <input matInput type="password" formControlName="confirmPassword">
                      </mat-form-field>

                      <button mat-raised-button color="primary">Update Password</button>
                    </form>
                  </div>

                  <mat-divider></mat-divider>

                  <!-- Two-Factor Authentication -->
                  <div>
                    <h3 class="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div class="font-medium">Two-Factor Authentication</div>
                        <div class="text-sm text-gray-500">Add an extra layer of security to your account</div>
                      </div>
                      <mat-slide-toggle></mat-slide-toggle>
                    </div>
                  </div>

                  <mat-divider></mat-divider>

                  <!-- Login Sessions -->
                  <div>
                    <h3 class="text-lg font-medium mb-4">Active Sessions</h3>
                    <div class="space-y-3">
                      <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="flex items-center">
                          <mat-icon class="mr-3 text-green-500">computer</mat-icon>
                          <div>
                            <div class="font-medium">Chrome on Windows</div>
                            <div class="text-sm text-gray-500">Last active: 2 hours ago</div>
                          </div>
                        </div>
                        <button mat-button color="warn">Revoke</button>
                      </div>

                      <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div class="flex items-center">
                          <mat-icon class="mr-3 text-blue-500">smartphone</mat-icon>
                          <div>
                            <div class="font-medium">Safari on iPhone</div>
                            <div class="text-sm text-gray-500">Last active: 1 day ago</div>
                          </div>
                        </div>
                        <button mat-button color="warn">Revoke</button>
                      </div>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Notifications -->
        <mat-tab label="Notifications">
          <div class="p-6">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Notification Preferences</mat-card-title>
                <mat-card-subtitle>Choose how you want to be notified</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="space-y-6">
                  <div>
                    <h3 class="text-lg font-medium mb-4">Email Notifications</h3>
                    <div class="space-y-3">
                      <div class="flex items-center justify-between">
                        <div>
                          <div class="font-medium">New User Registration</div>
                          <div class="text-sm text-gray-500">Get notified when new users join</div>
                        </div>
                        <mat-slide-toggle checked></mat-slide-toggle>
                      </div>

                      <div class="flex items-center justify-between">
                        <div>
                          <div class="font-medium">System Updates</div>
                          <div class="text-sm text-gray-500">Receive updates about system maintenance</div>
                        </div>
                        <mat-slide-toggle checked></mat-slide-toggle>
                      </div>

                      <div class="flex items-center justify-between">
                        <div>
                          <div class="font-medium">Security Alerts</div>
                          <div class="text-sm text-gray-500">Get notified of security events</div>
                        </div>
                        <mat-slide-toggle></mat-slide-toggle>
                      </div>
                    </div>
                  </div>

                  <mat-divider></mat-divider>

                  <div>
                    <h3 class="text-lg font-medium mb-4">Push Notifications</h3>
                    <div class="space-y-3">
                      <div class="flex items-center justify-between">
                        <div>
                          <div class="font-medium">Real-time Updates</div>
                          <div class="text-sm text-gray-500">Receive instant notifications</div>
                        </div>
                        <mat-slide-toggle checked></mat-slide-toggle>
                      </div>

                      <div class="flex items-center justify-between">
                        <div>
                          <div class="font-medium">Marketing Messages</div>
                          <div class="text-sm text-gray-500">Receive promotional content</div>
                        </div>
                        <mat-slide-toggle></mat-slide-toggle>
                      </div>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <!-- Preferences -->
        <mat-tab label="Preferences">
          <div class="p-6">
            <mat-card>
              <mat-card-header>
                <mat-card-title>Application Preferences</mat-card-title>
                <mat-card-subtitle>Customize your experience</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="space-y-6">
                  <div>
                    <h3 class="text-lg font-medium mb-4">Display Settings</h3>
                    <div class="space-y-4">
                      <mat-form-field appearance="outline" class="w-full">
                        <mat-label>Language</mat-label>
                        <mat-select>
                          <mat-option value="en">English</mat-option>
                          <mat-option value="es">Spanish</mat-option>
                          <mat-option value="fr">French</mat-option>
                        </mat-select>
                      </mat-form-field>

                      <mat-form-field appearance="outline" class="w-full">
                        <mat-label>Time Zone</mat-label>
                        <mat-select>
                          <mat-option value="utc">UTC</mat-option>
                          <mat-option value="est">Eastern Time</mat-option>
                          <mat-option value="pst">Pacific Time</mat-option>
                        </mat-select>
                      </mat-form-field>

                      <div class="flex items-center justify-between">
                        <div>
                          <div class="font-medium">Dark Mode</div>
                          <div class="text-sm text-gray-500">Use dark theme</div>
                        </div>
                        <mat-slide-toggle></mat-slide-toggle>
                      </div>
                    </div>
                  </div>

                  <mat-divider></mat-divider>

                  <div>
                    <h3 class="text-lg font-medium mb-4">Data & Privacy</h3>
                    <div class="space-y-3">
                      <div class="flex items-center justify-between">
                        <div>
                          <div class="font-medium">Data Collection</div>
                          <div class="text-sm text-gray-500">Allow us to collect usage data</div>
                        </div>
                        <mat-slide-toggle checked></mat-slide-toggle>
                      </div>

                      <div class="flex items-center justify-between">
                        <div>
                          <div class="font-medium">Analytics</div>
                          <div class="text-sm text-gray-500">Help improve the application</div>
                        </div>
                        <mat-slide-toggle checked></mat-slide-toggle>
                      </div>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `
})
export class SettingsComponent {
  profileForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['John', Validators.required],
      lastName: ['Doe', Validators.required],
      email: ['john.doe@example.com', [Validators.required, Validators.email]],
      phone: ['+1 (555) 123-4567'],
      bio: ['Software developer with 5+ years of experience in web development.']
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }
} 