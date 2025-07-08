import { Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('../../features/dashboard/pages/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'users',
        loadComponent: () => import('../../features/user/pages/user-list.component').then(m => m.UserListComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('../../features/reports/pages/reports.component').then(m => m.ReportsComponent)
      },
      {
        path: 'forms',
        loadComponent: () => import('../../features/admin/pages/form-demo.component').then(m => m.FormDemoComponent)
      },
      {
        path: 'ui',
        loadComponent: () => import('../../features/admin/pages/ui-demo.component').then(m => m.UiDemoComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('../../features/settings/pages/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('../../features/profile/pages/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'blank',
        loadComponent: () => import('../../features/admin/pages/blank.component').then(m => m.BlankComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
]; 