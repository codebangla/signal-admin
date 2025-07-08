import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./layouts/auth-layout/auth-layout.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./layouts/main-layout/main-layout.routes').then(m => m.MAIN_ROUTES)
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
]; 