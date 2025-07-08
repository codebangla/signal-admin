import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ui-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
  template: `
    <div class="space-y-6">
      <!-- Buttons -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Buttons</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="flex flex-wrap gap-4">
            <button mat-raised-button color="primary">Primary</button>
            <button mat-raised-button color="accent">Accent</button>
            <button mat-raised-button color="warn">Warn</button>
            <button mat-button>Basic</button>
            <button mat-stroked-button>Stroked</button>
            <button mat-flat-button color="primary">Flat</button>
            <button mat-fab color="primary">
              <mat-icon>add</mat-icon>
            </button>
            <button mat-mini-fab color="accent">
              <mat-icon>favorite</mat-icon>
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Chips -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Chips</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="flex flex-wrap gap-2">
            <mat-chip color="primary" selected>Primary</mat-chip>
            <mat-chip color="accent" selected>Accent</mat-chip>
            <mat-chip color="warn" selected>Warn</mat-chip>
            <mat-chip>Basic</mat-chip>
            <mat-chip>
              <mat-icon matChipAvatar>person</mat-icon>
              With Avatar
            </mat-chip>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Progress Indicators -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Progress Indicators</mat-card-title>
        </mat-card-header>
        <mat-card-content class="space-y-4">
          <div>
            <h4 class="mb-2">Progress Bar</h4>
            <mat-progress-bar mode="determinate" [value]="65"></mat-progress-bar>
          </div>
          <div>
            <h4 class="mb-2">Progress Spinner</h4>
            <div class="flex gap-4">
              <mat-spinner diameter="40"></mat-spinner>
              <mat-spinner mode="determinate" [value]="75" diameter="40"></mat-spinner>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Badges -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Badges</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="flex gap-4 items-center">
            <button mat-icon-button [matBadge]="'8'" matBadgeColor="warn">
              <mat-icon>mail</mat-icon>
            </button>
            <button mat-icon-button [matBadge]="'99+'">
              <mat-icon>notifications</mat-icon>
            </button>
            <button mat-icon-button [matBadge]="'!'" matBadgeColor="accent">
              <mat-icon>favorite</mat-icon>
            </button>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Lists -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Lists</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-list>
            <mat-list-item>
              <mat-icon matListItemIcon>person</mat-icon>
              <div matListItemTitle>John Doe</div>
              <div matListItemLine>Administrator</div>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item>
              <mat-icon matListItemIcon>person</mat-icon>
              <div matListItemTitle>Jane Smith</div>
              <div matListItemLine>User</div>
            </mat-list-item>
            <mat-divider></mat-divider>
            <mat-list-item>
              <mat-icon matListItemIcon>person</mat-icon>
              <div matListItemTitle>Bob Johnson</div>
              <div matListItemLine>Editor</div>
            </mat-list-item>
          </mat-list>
        </mat-card-content>
      </mat-card>

      <!-- Tabs -->
      <mat-card>
        <mat-card-content>
          <mat-tab-group>
            <mat-tab label="Tab 1">
              <div class="p-4">
                <h3>Content for Tab 1</h3>
                <p>This is the content for the first tab.</p>
              </div>
            </mat-tab>
            <mat-tab label="Tab 2">
              <div class="p-4">
                <h3>Content for Tab 2</h3>
                <p>This is the content for the second tab.</p>
              </div>
            </mat-tab>
            <mat-tab label="Tab 3">
              <div class="p-4">
                <h3>Content for Tab 3</h3>
                <p>This is the content for the third tab.</p>
              </div>
            </mat-tab>
          </mat-tab-group>
        </mat-card-content>
      </mat-card>

      <!-- Expansion Panels -->
      <mat-card>
        <mat-card-header>
          <mat-card-title>Expansion Panels</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-accordion>
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>Personal Information</mat-panel-title>
                <mat-panel-description>Click to expand</mat-panel-description>
              </mat-expansion-panel-header>
              <p>This is the content of the expansion panel.</p>
            </mat-expansion-panel>
            <mat-expansion-panel>
              <mat-expansion-panel-header>
                <mat-panel-title>Contact Details</mat-panel-title>
                <mat-panel-description>Click to expand</mat-panel-description>
              </mat-expansion-panel-header>
              <p>This is another expansion panel content.</p>
            </mat-expansion-panel>
          </mat-accordion>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class UiDemoComponent {
  constructor(private snackBar: MatSnackBar) {}

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }
} 