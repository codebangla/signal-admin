import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-form-demo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSliderModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="space-y-8 p-6">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Form Elements Showcase</h1>
        <p class="text-gray-600">Comprehensive collection of Angular Material form controls</p>
      </div>

      <!-- Basic Information Section -->
      <mat-card class="shadow-lg">
        <mat-card-header class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
          <mat-card-title class="text-xl font-semibold text-gray-800">
            <mat-icon class="mr-2">person</mat-icon>
            Basic Information
          </mat-card-title>
          <mat-card-subtitle class="text-gray-600">Personal details and contact information</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="p-6">
          <form [formGroup]="demoForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Full Name -->
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Full Name</mat-label>
                <input matInput formControlName="fullName" placeholder="Enter your full name">
                <mat-icon matSuffix>person</mat-icon>
                <mat-error *ngIf="demoForm.get('fullName')?.hasError('required')">
                  Full name is required
                </mat-error>
                <mat-error *ngIf="demoForm.get('fullName')?.hasError('minlength')">
                  Name must be at least 2 characters
                </mat-error>
              </mat-form-field>

              <!-- Email -->
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Email Address</mat-label>
                <input matInput type="email" formControlName="email" placeholder="Enter your email">
                <mat-icon matSuffix>email</mat-icon>
                <mat-error *ngIf="demoForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="demoForm.get('email')?.hasError('email')">
                  Please enter a valid email
                </mat-error>
              </mat-form-field>

              <!-- Phone -->
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Phone Number</mat-label>
                <input matInput formControlName="phone" placeholder="Enter your phone number">
                <mat-icon matSuffix>phone</mat-icon>
                <mat-error *ngIf="demoForm.get('phone')?.hasError('required')">
                  Phone number is required
                </mat-error>
              </mat-form-field>

              <!-- Country -->
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Country</mat-label>
                <mat-select formControlName="country">
                  <mat-option value="us">United States</mat-option>
                  <mat-option value="ca">Canada</mat-option>
                  <mat-option value="uk">United Kingdom</mat-option>
                  <mat-option value="au">Australia</mat-option>
                  <mat-option value="de">Germany</mat-option>
                  <mat-option value="fr">France</mat-option>
                  <mat-option value="jp">Japan</mat-option>
                </mat-select>
                <mat-icon matSuffix>public</mat-icon>
                <mat-error *ngIf="demoForm.get('country')?.hasError('required')">
                  Please select a country
                </mat-error>
              </mat-form-field>

              <!-- City with Autocomplete -->
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>City</mat-label>
                <input type="text" matInput formControlName="city" [matAutocomplete]="auto">
                <mat-autocomplete #auto="matAutocomplete">
                  <mat-option *ngFor="let city of filteredCities | async" [value]="city">
                    {{ city }}
                  </mat-option>
                </mat-autocomplete>
                <mat-icon matSuffix>location_city</mat-icon>
              </mat-form-field>

              <!-- Birth Date -->
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Birth Date</mat-label>
                <input matInput [matDatepicker]="picker" formControlName="birthDate">
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                <mat-icon matSuffix>calendar_today</mat-icon>
              </mat-form-field>
            </div>

            <!-- Address -->
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Address</mat-label>
              <textarea matInput formControlName="address" rows="3" placeholder="Enter your full address"></textarea>
              <mat-icon matSuffix>home</mat-icon>
            </mat-form-field>

            <!-- Gender Selection -->
            <div class="space-y-3">
              <label class="block text-sm font-medium text-gray-700">Gender</label>
              <mat-radio-group formControlName="gender" class="flex space-x-6">
                <mat-radio-button value="male" class="flex items-center">
                  <mat-icon class="mr-2 text-blue-500">male</mat-icon>
                  Male
                </mat-radio-button>
                <mat-radio-button value="female" class="flex items-center">
                  <mat-icon class="mr-2 text-pink-500">female</mat-icon>
                  Female
                </mat-radio-button>
                <mat-radio-button value="other" class="flex items-center">
                  <mat-icon class="mr-2 text-purple-500">person</mat-icon>
                  Other
                </mat-radio-button>
              </mat-radio-group>
            </div>

            <mat-divider></mat-divider>

            <!-- Preferences Section -->
            <div class="space-y-6">
              <h3 class="text-lg font-semibold text-gray-800 flex items-center">
                <mat-icon class="mr-2">settings</mat-icon>
                Preferences & Settings
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Interests -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium text-gray-700">Interests</label>
                  <div class="grid grid-cols-2 gap-3">
                    <mat-checkbox formControlName="interests.sports" class="flex items-center">
                      <mat-icon class="mr-2 text-green-500">sports_soccer</mat-icon>
                      Sports
                    </mat-checkbox>
                    <mat-checkbox formControlName="interests.music" class="flex items-center">
                      <mat-icon class="mr-2 text-blue-500">music_note</mat-icon>
                      Music
                    </mat-checkbox>
                    <mat-checkbox formControlName="interests.reading" class="flex items-center">
                      <mat-icon class="mr-2 text-orange-500">book</mat-icon>
                      Reading
                    </mat-checkbox>
                    <mat-checkbox formControlName="interests.travel" class="flex items-center">
                      <mat-icon class="mr-2 text-purple-500">flight</mat-icon>
                      Travel
                    </mat-checkbox>
                    <mat-checkbox formControlName="interests.cooking" class="flex items-center">
                      <mat-icon class="mr-2 text-red-500">restaurant</mat-icon>
                      Cooking
                    </mat-checkbox>
                    <mat-checkbox formControlName="interests.gaming" class="flex items-center">
                      <mat-icon class="mr-2 text-indigo-500">games</mat-icon>
                      Gaming
                    </mat-checkbox>
                  </div>
                </div>

                <!-- Skills -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium text-gray-700">Skills</label>
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>Add skills</mat-label>
                    <mat-chip-grid #chipGrid>
                      <mat-chip-row *ngFor="let skill of skills" (removed)="removeSkill(skill)">
                        {{ skill }}
                        <button matChipRemove>
                          <mat-icon>cancel</mat-icon>
                        </button>
                      </mat-chip-row>
                    </mat-chip-grid>
                    <input placeholder="New skill..." [matChipInputFor]="chipGrid" (matChipInputTokenEnd)="addSkill($event)">
                  </mat-form-field>
                </div>
              </div>

              <!-- Slider Controls -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-3">
                  <label class="block text-sm font-medium text-gray-700">Experience Level</label>
                  <mat-slider formControlName="experienceLevel" min="0" max="10" step="1" class="w-full">
                    <input matSliderThumb>
                  </mat-slider>
                  <div class="flex justify-between text-xs text-gray-500">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>

                <div class="space-y-3">
                  <label class="block text-sm font-medium text-gray-700">Salary Range</label>
                  <mat-slider formControlName="salaryRange" min="30000" max="150000" step="5000" class="w-full">
                    <input matSliderThumb>
                  </mat-slider>
                  <div class="text-sm text-gray-600">
                    {{ getSalaryValue() }} per year
                  </div>
                </div>
              </div>

              <!-- Toggle Switches -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div class="font-medium">Email Notifications</div>
                    <div class="text-sm text-gray-500">Receive email updates</div>
                  </div>
                  <mat-slide-toggle formControlName="emailNotifications" color="primary"></mat-slide-toggle>
                </div>

                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div class="font-medium">SMS Notifications</div>
                    <div class="text-sm text-gray-500">Receive SMS alerts</div>
                  </div>
                  <mat-slide-toggle formControlName="smsNotifications" color="primary"></mat-slide-toggle>
                </div>

                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div class="font-medium">Public Profile</div>
                    <div class="text-sm text-gray-500">Make profile visible</div>
                  </div>
                  <mat-slide-toggle formControlName="publicProfile" color="primary"></mat-slide-toggle>
                </div>
              </div>
            </div>

            <mat-divider></mat-divider>

            <!-- File Upload Section -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold text-gray-800 flex items-center">
                <mat-icon class="mr-2">upload_file</mat-icon>
                File Upload
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-3">
                  <label class="block text-sm font-medium text-gray-700">Profile Picture</label>
                  <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <mat-icon class="text-4xl text-gray-400 mb-2">cloud_upload</mat-icon>
                    <div class="text-sm text-gray-600 mb-2">Click to upload or drag and drop</div>
                    <button mat-stroked-button type="button" class="mt-2">
                      <mat-icon class="mr-2">add_photo_alternate</mat-icon>
                      Choose File
                    </button>
                  </div>
                </div>

                <div class="space-y-3">
                  <label class="block text-sm font-medium text-gray-700">Resume/CV</label>
                  <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <mat-icon class="text-4xl text-gray-400 mb-2">description</mat-icon>
                    <div class="text-sm text-gray-600 mb-2">Upload your resume (PDF, DOC)</div>
                    <button mat-stroked-button type="button" class="mt-2">
                      <mat-icon class="mr-2">upload_file</mat-icon>
                      Choose File
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <label class="block text-sm font-medium text-gray-700">Form Completion</label>
                <span class="text-sm text-gray-500">{{ getFormCompletion() }}%</span>
              </div>
              <mat-progress-bar mode="determinate" [value]="getFormCompletion()" color="primary"></mat-progress-bar>
            </div>

            <!-- Submit Buttons -->
            <div class="flex justify-end space-x-4 pt-6">
              <button mat-button type="button" (click)="resetForm()" class="px-6">
                <mat-icon class="mr-2">refresh</mat-icon>
                Reset
              </button>
              <button mat-raised-button color="primary" type="submit" [disabled]="demoForm.invalid" class="px-6">
                <mat-icon class="mr-2">save</mat-icon>
                Submit Form
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <!-- Form Values Display -->
      <mat-card *ngIf="submitted" class="shadow-lg">
        <mat-card-header class="bg-green-50 p-6">
          <mat-card-title class="text-xl font-semibold text-green-800">
            <mat-icon class="mr-2">check_circle</mat-icon>
            Form Submitted Successfully!
          </mat-card-title>
        </mat-card-header>
        <mat-card-content class="p-6">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-800 mb-3">Submitted Data:</h4>
            <pre class="text-sm text-gray-700 overflow-auto">{{ formValues | json }}</pre>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class FormDemoComponent {
  demoForm: FormGroup;
  submitted = false;
  formValues: any;
  skills: string[] = ['JavaScript', 'Angular', 'TypeScript'];
  cities: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  filteredCities: Observable<string[]>;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.demoForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      country: ['', Validators.required],
      city: [''],
      address: [''],
      birthDate: [''],
      gender: [''],
      interests: this.fb.group({
        sports: [false],
        music: [false],
        reading: [false],
        travel: [false],
        cooking: [false],
        gaming: [false]
      }),
      experienceLevel: [5],
      salaryRange: [75000],
      emailNotifications: [true],
      smsNotifications: [false],
      publicProfile: [true]
    });

    // Setup autocomplete for cities
    this.filteredCities = this.demoForm.get('city')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCities(value || ''))
    );
  }

  private _filterCities(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(city => city.toLowerCase().includes(filterValue));
  }

  addSkill(event: any): void {
    const value = (event.value || '').trim();
    if (value && !this.skills.includes(value)) {
      this.skills.push(value);
    }
    event.chipInput!.clear();
  }

  removeSkill(skill: string): void {
    const index = this.skills.indexOf(skill);
    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  getSalaryValue(): number {
    return this.demoForm.get('salaryRange')?.value || 0;
  }

  getFormCompletion(): number {
    const controls = this.demoForm.controls;
    const totalControls = Object.keys(controls).length;
    const filledControls = Object.keys(controls).filter(key => {
      const control = controls[key];
      return control.value !== null && control.value !== '' && control.value !== false;
    }).length;
    return Math.round((filledControls / totalControls) * 100);
  }

  onSubmit(): void {
    if (this.demoForm.valid) {
      this.submitted = true;
      this.formValues = {
        ...this.demoForm.value,
        skills: this.skills
      };
      console.log('Form submitted:', this.formValues);
      this.snackBar.open('Form submitted successfully!', 'Close', { duration: 3000 });
    } else {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
    }
  }

  resetForm(): void {
    this.demoForm.reset();
    this.submitted = false;
    this.skills = ['JavaScript', 'Angular', 'TypeScript'];
    this.snackBar.open('Form reset successfully', 'Close', { duration: 2000 });
  }
} 