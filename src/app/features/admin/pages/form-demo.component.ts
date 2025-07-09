import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
    <div class="p-6 space-y-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2">Form Elements Showcase</h1>
        <p>Comprehensive collection of Angular Material form controls</p>
      </div>

      <!-- Basic Information Section -->
      <mat-card>
        <mat-card-header class="p-6">
          <mat-card-title class="text-xl font-semibold flex items-center">
            <mat-icon class="mr-2">person</mat-icon>
            Basic Information
          </mat-card-title>
          <mat-card-subtitle>Personal details and contact information</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content class="p-6">
          <form [formGroup]="demoForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Full Name -->
              <mat-form-field class="w-full">
                <mat-label>Full Name</mat-label>
                <input matInput [formControl]="fullNameFormControl" placeholder="Enter your full name">
                <mat-icon matSuffix>person</mat-icon>
                @if (fullNameFormControl.hasError('required')) {
                  <mat-error>Full name is required</mat-error>
                }
                @if (fullNameFormControl.hasError('minlength')) {
                  <mat-error>Name must be at least 2 characters</mat-error>
                }
              </mat-form-field>

              <!-- Email -->
              <mat-form-field class="w-full">
                <mat-label>Email Address</mat-label>
                <input matInput type="email" [formControl]="emailFormControl" placeholder="Enter your email">
                <mat-icon matSuffix>email</mat-icon>
                @if (emailFormControl.hasError('required')) {
                  <mat-error>Email is required</mat-error>
                }
                @if (emailFormControl.hasError('email')) {
                  <mat-error>Please enter a valid email</mat-error>
                }
              </mat-form-field>

              <!-- Phone -->
              <mat-form-field class="w-full">
                <mat-label>Phone Number</mat-label>
                <input matInput [formControl]="phoneFormControl" placeholder="Enter your phone number">
                <mat-icon matSuffix>phone</mat-icon>
                @if (phoneFormControl.hasError('required')) {
                  <mat-error>Phone number is required</mat-error>
                }
              </mat-form-field>

              <!-- Country -->
              <mat-form-field class="w-full">
                <mat-label>Country</mat-label>
                <mat-select [formControl]="countryFormControl">
                  <mat-option value="us">United States</mat-option>
                  <mat-option value="ca">Canada</mat-option>
                  <mat-option value="uk">United Kingdom</mat-option>
                  <mat-option value="au">Australia</mat-option>
                  <mat-option value="de">Germany</mat-option>
                  <mat-option value="fr">France</mat-option>
                  <mat-option value="jp">Japan</mat-option>
                </mat-select>
                <mat-icon matSuffix>public</mat-icon>
                @if (countryFormControl.hasError('required')) {
                  <mat-error>Please select a country</mat-error>
                }
              </mat-form-field>

              <!-- City with Autocomplete -->
              <mat-form-field class="w-full">
                <mat-label>City</mat-label>
                <input type="text" matInput [formControl]="cityFormControl" [matAutocomplete]="auto">
                <mat-autocomplete #auto="matAutocomplete">
                  @for (city of filteredCities | async; track city) {
                    <mat-option [value]="city">{{ city }}</mat-option>
                  }
                </mat-autocomplete>
                <mat-icon matSuffix>location_city</mat-icon>
              </mat-form-field>

              <!-- Birth Date -->
              <mat-form-field class="w-full">
                <mat-label>Birth Date</mat-label>
                <input matInput [matDatepicker]="picker" [formControl]="birthDateFormControl">
                <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
                <mat-datepicker #picker></mat-datepicker>
                <mat-icon matSuffix>calendar_today</mat-icon>
              </mat-form-field>
            </div>

            <!-- Address -->
            <mat-form-field class="w-full">
              <mat-label>Address</mat-label>
              <textarea matInput [formControl]="addressFormControl" rows="3" placeholder="Enter your full address"></textarea>
              <mat-icon matSuffix>home</mat-icon>
            </mat-form-field>

            <!-- Gender Selection -->
            <div class="space-y-3">
              <label class="block text-sm font-medium">Gender</label>
              <mat-radio-group [formControl]="genderFormControl" class="flex space-x-6">
                <mat-radio-button value="male" class="flex items-center">
                  <mat-icon class="mr-2">male</mat-icon>
                  Male
                </mat-radio-button>
                <mat-radio-button value="female" class="flex items-center">
                  <mat-icon class="mr-2">female</mat-icon>
                  Female
                </mat-radio-button>
                <mat-radio-button value="other" class="flex items-center">
                  <mat-icon class="mr-2">person</mat-icon>
                  Other
                </mat-radio-button>
              </mat-radio-group>
            </div>

            <mat-divider></mat-divider>

            <!-- Preferences Section -->
            <div class="space-y-6">
              <h3 class="text-lg font-semibold flex items-center">
                <mat-icon class="mr-2">settings</mat-icon>
                Preferences & Settings
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Interests -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Interests</label>
                  <div class="grid grid-cols-2 gap-3">
                    <mat-checkbox [formControl]="sportsFormControl" class="flex items-center">
                      <mat-icon class="mr-2">sports_soccer</mat-icon>
                      Sports
                    </mat-checkbox>
                    <mat-checkbox [formControl]="musicFormControl" class="flex items-center">
                      <mat-icon class="mr-2">music_note</mat-icon>
                      Music
                    </mat-checkbox>
                    <mat-checkbox [formControl]="readingFormControl" class="flex items-center">
                      <mat-icon class="mr-2">book</mat-icon>
                      Reading
                    </mat-checkbox>
                    <mat-checkbox [formControl]="travelFormControl" class="flex items-center">
                      <mat-icon class="mr-2">flight</mat-icon>
                      Travel
                    </mat-checkbox>
                    <mat-checkbox [formControl]="cookingFormControl" class="flex items-center">
                      <mat-icon class="mr-2">restaurant</mat-icon>
                      Cooking
                    </mat-checkbox>
                    <mat-checkbox [formControl]="gamingFormControl" class="flex items-center">
                      <mat-icon class="mr-2">games</mat-icon>
                      Gaming
                    </mat-checkbox>
                  </div>
                </div>

                <!-- Skills -->
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Skills</label>
                  <mat-form-field class="w-full">
                    <mat-label>Add skills</mat-label>
                    <mat-chip-grid #chipGrid>
                      @for (skill of skills; track skill) {
                        <mat-chip-row (removed)="removeSkill(skill)">
                          {{ skill }}
                          <button matChipRemove>
                            <mat-icon>cancel</mat-icon>
                          </button>
                        </mat-chip-row>
                      }
                    </mat-chip-grid>
                    <input placeholder="New skill..." [matChipInputFor]="chipGrid" (matChipInputTokenEnd)="addSkill($event)">
                  </mat-form-field>
                </div>
              </div>

              <!-- Slider Controls -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Experience Level</label>
                  <mat-slider [formControl]="experienceLevelFormControl" min="0" max="10" step="1" class="w-full">
                    <input matSliderThumb>
                  </mat-slider>
                  <div class="flex justify-between text-xs">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                </div>

                <div class="space-y-3">
                  <label class="block text-sm font-medium">Salary Range</label>
                  <mat-slider [formControl]="salaryRangeFormControl" min="30000" max="150000" step="5000" class="w-full">
                    <input matSliderThumb>
                  </mat-slider>
                  <div class="text-sm">
                    {{ getSalaryValue() }} per year
                  </div>
                </div>
              </div>

              <!-- Toggle Switches -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="flex items-center justify-between p-3 rounded-lg">
                  <div>
                    <div class="font-medium">Email Notifications</div>
                    <div class="text-sm">Receive email updates</div>
                  </div>
                  <mat-slide-toggle [formControl]="emailNotificationsFormControl" color="primary"></mat-slide-toggle>
                </div>

                <div class="flex items-center justify-between p-3 rounded-lg">
                  <div>
                    <div class="font-medium">SMS Notifications</div>
                    <div class="text-sm">Receive SMS alerts</div>
                  </div>
                  <mat-slide-toggle [formControl]="smsNotificationsFormControl" color="primary"></mat-slide-toggle>
                </div>

                <div class="flex items-center justify-between p-3 rounded-lg">
                  <div>
                    <div class="font-medium">Public Profile</div>
                    <div class="text-sm">Make profile visible</div>
                  </div>
                  <mat-slide-toggle [formControl]="publicProfileFormControl" color="primary"></mat-slide-toggle>
                </div>
              </div>
            </div>

            <mat-divider></mat-divider>

            <!-- File Upload Section -->
            <div class="space-y-4">
              <h3 class="text-lg font-semibold flex items-center">
                <mat-icon class="mr-2">upload_file</mat-icon>
                File Upload
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-3">
                  <label class="block text-sm font-medium">Profile Picture</label>
                  <div class="border-2 border-dashed rounded-lg p-6 text-center">
                    <mat-icon class="text-4xl mb-2">cloud_upload</mat-icon>
                    <div class="text-sm mb-2">Click to upload or drag and drop</div>
                    <button mat-stroked-button type="button" class="mt-2">
                      <mat-icon class="mr-2">add_photo_alternate</mat-icon>
                      Choose File
                    </button>
                  </div>
                </div>

                <div class="space-y-3">
                  <label class="block text-sm font-medium">Resume/CV</label>
                  <div class="border-2 border-dashed rounded-lg p-6 text-center">
                    <mat-icon class="text-4xl mb-2">description</mat-icon>
                    <div class="text-sm mb-2">Upload your resume (PDF, DOC)</div>
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
                <label class="block text-sm font-medium">Form Completion</label>
                <span class="text-sm">{{ getFormCompletion() }}%</span>
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
      @if (submitted) {
        <mat-card>
          <mat-card-header class="p-6">
            <mat-card-title class="text-xl font-semibold flex items-center">
              <mat-icon class="mr-2">check_circle</mat-icon>
              Form Submitted Successfully!
            </mat-card-title>
          </mat-card-header>
          <mat-card-content class="p-6">
            <div class="p-4 rounded-lg">
              <h4 class="font-medium mb-3">Submitted Data:</h4>
              <pre class="text-sm overflow-auto">{{ formValues | json }}</pre>
            </div>
          </mat-card-content>
        </mat-card>
      }
    </div>
  `
})
export class FormDemoComponent {
  // Form Controls
  fullNameFormControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  phoneFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]);
  countryFormControl = new FormControl('', [Validators.required]);
  cityFormControl = new FormControl('');
  addressFormControl = new FormControl('');
  birthDateFormControl = new FormControl('');
  genderFormControl = new FormControl('');
  
  // Interest Form Controls
  sportsFormControl = new FormControl(false);
  musicFormControl = new FormControl(false);
  readingFormControl = new FormControl(false);
  travelFormControl = new FormControl(false);
  cookingFormControl = new FormControl(false);
  gamingFormControl = new FormControl(false);
  
  // Settings Form Controls
  experienceLevelFormControl = new FormControl(5);
  salaryRangeFormControl = new FormControl(75000);
  emailNotificationsFormControl = new FormControl(true);
  smsNotificationsFormControl = new FormControl(false);
  publicProfileFormControl = new FormControl(true);

  demoForm: FormGroup;
  submitted = false;
  formValues: any;
  skills: string[] = ['JavaScript', 'Angular', 'TypeScript'];
  cities: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  filteredCities: Observable<string[]>;

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.demoForm = this.fb.group({
      fullName: this.fullNameFormControl,
      email: this.emailFormControl,
      phone: this.phoneFormControl,
      country: this.countryFormControl,
      city: this.cityFormControl,
      address: this.addressFormControl,
      birthDate: this.birthDateFormControl,
      gender: this.genderFormControl,
      interests: this.fb.group({
        sports: this.sportsFormControl,
        music: this.musicFormControl,
        reading: this.readingFormControl,
        travel: this.travelFormControl,
        cooking: this.cookingFormControl,
        gaming: this.gamingFormControl
      }),
      experienceLevel: this.experienceLevelFormControl,
      salaryRange: this.salaryRangeFormControl,
      emailNotifications: this.emailNotificationsFormControl,
      smsNotifications: this.smsNotificationsFormControl,
      publicProfile: this.publicProfileFormControl
    });

    // Setup autocomplete for cities
    this.filteredCities = this.cityFormControl.valueChanges.pipe(
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
    return this.salaryRangeFormControl.value || 0;
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