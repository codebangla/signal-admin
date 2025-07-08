import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError, catchError, tap, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginRequest, LoginResponse, AuthUser } from '../models/auth.model';

// Custom error types
export interface AuthError {
  message: string;
  code: string;
  details?: any;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<AuthUser | null>(null);
  private token = signal<string | null>(null);
  private isLoading = signal<boolean>(false);
  private error = signal<AuthError | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.initializeAuthState();
  }

  /**
   * Initialize authentication state from localStorage
   */
  private initializeAuthState(): void {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        const user = this.parseStoredUser(storedUser);
        if (user && this.isValidToken(storedToken)) {
          this.token.set(storedToken);
          this.currentUser.set(user);
          console.log('AuthService: User session restored');
        } else {
          this.clearStoredAuth();
        }
      }
    } catch (error) {
      console.error('AuthService: Error initializing auth state:', error);
      this.clearStoredAuth();
    }
  }

  /**
   * Parse stored user data with validation
   */
  private parseStoredUser(storedUser: string): AuthUser | null {
    try {
      const user = JSON.parse(storedUser);
      return this.validateUser(user) ? user : null;
    } catch (error) {
      console.error('AuthService: Error parsing stored user:', error);
      return null;
    }
  }

  /**
   * Validate user object structure
   */
  private validateUser(user: any): user is AuthUser {
    return !!(user && 
           typeof user.id === 'number' &&
           typeof user.name === 'string' &&
           typeof user.email === 'string' &&
           typeof user.role === 'string' &&
           user.name.trim().length > 0 &&
           user.email.trim().length > 0);
  }

  /**
   * Validate token format (basic check)
   */
  private isValidToken(token: string): boolean {
    return !!(token && token.trim().length > 0);
  }

  /**
   * Clear stored authentication data
   */
  private clearStoredAuth(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token.set(null);
    this.currentUser.set(null);
  }

  /**
   * Store authentication data safely
   */
  private storeAuthData(token: string, user: AuthUser): void {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('AuthService: Error storing auth data:', error);
      throw new Error('Failed to store authentication data');
    }
  }

  /**
   * Handle HTTP errors
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred';
    let errorCode = 'UNKNOWN_ERROR';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
      errorCode = 'CLIENT_ERROR';
    } else {
      // Server-side error
      switch (error.status) {
        case 401:
          errorMessage = 'Invalid credentials';
          errorCode = 'INVALID_CREDENTIALS';
          break;
        case 403:
          errorMessage = 'Access denied';
          errorCode = 'ACCESS_DENIED';
          break;
        case 404:
          errorMessage = 'Authentication service not found';
          errorCode = 'SERVICE_NOT_FOUND';
          break;
        case 500:
          errorMessage = 'Server error';
          errorCode = 'SERVER_ERROR';
          break;
        default:
          errorMessage = error.message || 'Network error';
          errorCode = 'NETWORK_ERROR';
      }
    }

    const authError: AuthError = {
      message: errorMessage,
      code: errorCode,
      details: error
    };

    this.error.set(authError);
    console.error('AuthService: Authentication error:', authError);
    
    return throwError(() => authError);
  }

  /**
   * Login with credentials
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    if (!credentials || !credentials.email || !credentials.password) {
      const error: AuthError = {
        message: 'Email and password are required',
        code: 'INVALID_INPUT'
      };
      this.error.set(error);
      return throwError(() => error);
    }

    this.isLoading.set(true);
    this.error.set(null);

    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          if (!response || !response.user || !response.token) {
            throw new Error('Invalid response from server');
          }
          
          this.token.set(response.token);
          this.currentUser.set(response.user);
          this.storeAuthData(response.token, response.user);
          this.isLoading.set(false);
          console.log('AuthService: User logged in successfully');
        }),
        catchError(error => {
          this.isLoading.set(false);
          return this.handleError(error);
        })
      );
  }

  /**
   * Mock login for development
   */
  mockLogin(email: string, password: string): Observable<LoginResponse> {
    if (!email || !password) {
      const error: AuthError = {
        message: 'Email and password are required',
        code: 'INVALID_INPUT'
      };
      this.error.set(error);
      return throwError(() => error);
    }

    this.isLoading.set(true);
    this.error.set(null);

    const mockResponse: LoginResponse = {
      user: {
        id: 1,
        name: 'Emily Carter',
        email: email,
        role: 'admin',
        avatar: 'https://randomuser.me/api/portraits/women/56.jpg'
      },
      token: 'mock-jwt-token-' + Date.now()
    };

    return new Observable(observer => {
      setTimeout(() => {
        try {
          this.token.set(mockResponse.token);
          this.currentUser.set(mockResponse.user);
          this.storeAuthData(mockResponse.token, mockResponse.user);
          this.isLoading.set(false);
          console.log('AuthService: Mock login successful');
          observer.next(mockResponse);
          observer.complete();
        } catch (error) {
          this.isLoading.set(false);
          const authError: AuthError = {
            message: 'Mock login failed',
            code: 'MOCK_LOGIN_ERROR',
            details: error
          };
          this.error.set(authError);
          observer.error(authError);
        }
      }, 1000);
    });
  }

  /**
   * Logout user
   */
  logout(): void {
    try {
      this.clearStoredAuth();
      this.isLoading.set(false);
      this.error.set(null);
      console.log('AuthService: User logged out');
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('AuthService: Error during logout:', error);
      // Force navigation even if logout fails
      this.router.navigate(['/auth/login']);
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.token();
    const user = this.currentUser();
    return !!(token && user && this.isValidToken(token));
  }

  /**
   * Get current user
   */
  getCurrentUser(): AuthUser | null {
    return this.currentUser();
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.token();
  }

  /**
   * Get loading state
   */
  getLoadingState(): boolean {
    return this.isLoading();
  }

  /**
   * Get current error
   */
  getError(): AuthError | null {
    return this.error();
  }

  /**
   * Clear current error
   */
  clearError(): void {
    this.error.set(null);
  }

  /**
   * Get complete auth state
   */
  getAuthState(): AuthState {
    return {
      user: this.currentUser(),
      token: this.token(),
      isAuthenticated: this.isAuthenticated(),
      isLoading: this.isLoading(),
      error: this.error()
    };
  }

  /**
   * Refresh user session
   */
  refreshSession(): Observable<boolean> {
    if (!this.isAuthenticated()) {
      return of(false);
    }

    // In a real app, you would validate the token with the server
    // For now, we'll just return the current state
    return of(this.isAuthenticated());
  }
} 