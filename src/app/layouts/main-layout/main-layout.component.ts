import { Component, signal, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule,
    MatExpansionModule
  ],
  template: `
    <mat-sidenav-container class="h-screen">
      <!-- Sidebar -->
      <mat-sidenav #sidenav mode="side" [(opened)]="sidebarOpened" class="w-64 transition-all duration-300 bg-white">
        <!-- Brand -->
        <div class="flex items-center h-16 px-4 border-b border-gray-200">
          <mat-icon class="text-2xl text-primary-600 mr-2">signal_cellular_alt</mat-icon>
          <span class="text-xl font-bold text-gray-900">Signal Admin</span>
        </div>
        <!-- Navigation Menu -->
        <mat-nav-list class="p-0">
          <!-- Dashboard -->
          <a mat-list-item routerLink="/dashboard" routerLinkActive="bg-primary-50 text-primary-600" class="!px-2 !py-1 w-full">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <!-- Management Group -->
          <mat-expansion-panel class="!shadow-none !bg-transparent !border-none !m-0 !p-0" expanded>
            <mat-expansion-panel-header>
              <mat-panel-title class="flex items-center">
                <mat-icon class="mr-2">people</mat-icon>
                Management
              </mat-panel-title>
            </mat-expansion-panel-header>
            <mat-nav-list class="p-0">
              <a mat-list-item routerLink="/users" routerLinkActive="bg-primary-50 text-primary-600" class="!px-2 !py-1 w-full">
                Users
              </a>
              <a mat-list-item routerLink="/reports" routerLinkActive="bg-primary-50 text-primary-600" class="!px-2 !py-1 w-full">
                Reports
              </a>
            </mat-nav-list>
          </mat-expansion-panel>
          <!-- UI Group -->
          <mat-expansion-panel class="!shadow-none !bg-transparent !border-none !m-0 !p-0" expanded>
            <mat-expansion-panel-header>
              <mat-panel-title class="flex items-center">
                <mat-icon class="mr-2">palette</mat-icon>
                UI
              </mat-panel-title>
            </mat-expansion-panel-header>
            <mat-nav-list class="p-0">
              <a mat-list-item routerLink="/forms" routerLinkActive="bg-primary-50 text-primary-600" class="!px-2 !py-1 w-full">
                Forms
              </a>
              <a mat-list-item routerLink="/ui" routerLinkActive="bg-primary-50 text-primary-600" class="!px-2 !py-1 w-full">
                UI Components
              </a>
              <a mat-list-item routerLink="/blank" routerLinkActive="bg-primary-50 text-primary-600" class="!px-2 !py-1 w-full">
                Blank Page
              </a>
            </mat-nav-list>
          </mat-expansion-panel>
          <!-- Settings Group -->
          <mat-expansion-panel class="!shadow-none !bg-transparent !border-none !m-0 !p-0" expanded>
            <mat-expansion-panel-header>
              <mat-panel-title class="flex items-center">
                <mat-icon class="mr-2">Options</mat-icon>
                Options
              </mat-panel-title>
            </mat-expansion-panel-header>
            <mat-nav-list class="p-0">
              <a mat-list-item routerLink="/settings" routerLinkActive="bg-primary-50 text-primary-600" class="!px-2 !py-1 w-full">
                Settings
              </a>
              <a mat-list-item routerLink="/profile" routerLinkActive="bg-primary-50 text-primary-600" class="!px-2 !py-1 w-full">
                Profile
              </a>
            </mat-nav-list>
          </mat-expansion-panel>
        </mat-nav-list>
      </mat-sidenav>
      <!-- Main Content -->
      <mat-sidenav-content class="flex flex-col flex-1 min-w-0">
        <!-- Header -->
        <mat-toolbar color="primary" class="flex items-center justify-between">
          <div class="flex items-center">
            <button mat-icon-button (click)="sidebarOpened = !sidebarOpened">
              <mat-icon>menu</mat-icon>
            </button>
            <h1 class="text-xl font-semibold ml-4">{{ pageTitle() }}</h1>
          </div>
          <div class="flex items-center space-x-2">
            <div class="flex items-center space-x-2 px-2 py-1 rounded hover:bg-primary-700 transition cursor-pointer" [matMenuTriggerFor]="userMenu">
              <div class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <img [src]="currentUser()?.avatar" [alt]="currentUser()?.name" 
                     class="w-full h-full rounded-full object-cover"
                     (error)="onImageError($event)">
                <span *ngIf="!currentUser()?.avatar" class="text-xs font-medium text-gray-600">
                  {{ currentUser()?.name?.charAt(0)?.toUpperCase() }}
                </span>
              </div>
              <span class="text-base font-medium text-white ml-2">{{ currentUser()?.name }}</span>
            </div>
            <mat-menu #userMenu="matMenu">
              <button mat-menu-item [routerLink]="'/profile'">
                <mat-icon>person</mat-icon>
                <span>Profile</span>
              </button>
              <button mat-menu-item [routerLink]="'/settings'">
                <mat-icon>settings</mat-icon>
                <span>Settings</span>
              </button>
              <mat-divider></mat-divider>
              <button mat-menu-item (click)="logout()">
                <mat-icon>logout</mat-icon>
                <span>Logout</span>
              </button>
            </mat-menu>
          </div>
        </mat-toolbar>
        <!-- Page Content -->
        <div class="flex-1 overflow-y-scroll min-h-0 p-6 bg-gray-50">
          <router-outlet></router-outlet>
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `
})
export class MainLayoutComponent implements OnInit {
  sidebarOpened = true;
  pageTitle = signal('Dashboard');
  currentUser = signal(this.authService.getCurrentUser());

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Keep currentUser in sync with AuthService
    effect(() => {
      this.currentUser.set(this.authService.getCurrentUser());
    });
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      this.updatePageTitle(url);
    });
  }

  private updatePageTitle(url: string): void {
    const routeMap: { [key: string]: string } = {
      '/dashboard': 'Dashboard',
      '/users': 'Users',
      '/analytics': 'Analytics',
      '/reports': 'Reports',
      '/forms': 'Forms',
      '/ui': 'UI Components',
      '/settings': 'Settings',
      '/profile': 'Profile',
      '/blank': 'Blank Page'
    };

    const title = routeMap[url] || 'Dashboard';
    this.pageTitle.set(title);
  }

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }

  logout(): void {
    this.authService.logout();
  }
} 