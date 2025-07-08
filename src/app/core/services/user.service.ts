import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError, map } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../../environments/environment';

// Custom error types
export interface UserError {
  message: string;
  code: string;
  details?: any;
}

export interface UserListParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  role?: string;
  status?: string;
}

export interface UserListResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UserServiceState {
  isLoading: boolean;
  error: UserError | null;
  lastUpdated: Date | null;
}

@Injectable({ 
  providedIn: 'root' 
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  private isLoading = false;
  private error: UserError | null = null;
  private lastUpdated: Date | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Get users with pagination, sorting, and filtering
   */
  getUsers(params: UserListParams = {}): Observable<UserListResponse> {
    this.setLoading(true);
    this.clearError();

    const httpParams = this.buildHttpParams(params);

    return this.http.get<User[]>(this.apiUrl, { 
      params: httpParams, 
      observe: 'response' 
    }).pipe(
      map(response => {
        const users = response.body || [];
        const total = parseInt(response.headers.get('X-Total-Count') || '0');
        const page = params.page || 1;
        const limit = params.limit || 10;
        const totalPages = Math.ceil(total / limit);

        this.setLoading(false);
        this.lastUpdated = new Date();

        return {
          data: users,
          total,
          page,
          limit,
          totalPages
        };
      }),
      catchError(error => {
        this.setLoading(false);
        return this.handleError(error);
      })
    );
  }

  /**
   * Get a single user by ID
   */
  getUser(id: number): Observable<User> {
    if (!id || id <= 0) {
      const error: UserError = {
        message: 'Invalid user ID',
        code: 'INVALID_ID'
      };
      return throwError(() => error);
    }

    this.setLoading(true);
    this.clearError();

    return this.http.get<User>(`${this.apiUrl}/${id}`).pipe(
      map(user => {
        if (!user) {
          throw new Error('User not found');
        }
        this.setLoading(false);
        this.lastUpdated = new Date();
        return user;
      }),
      catchError(error => {
        this.setLoading(false);
        return this.handleError(error);
      })
    );
  }

  /**
   * Add a new user
   */
  addUser(user: Partial<User>): Observable<User> {
    if (!user) {
      const error: UserError = {
        message: 'User data is required',
        code: 'INVALID_INPUT'
      };
      return throwError(() => error);
    }

    if (!this.validateUserData(user)) {
      const error: UserError = {
        message: 'Invalid user data provided',
        code: 'VALIDATION_ERROR'
      };
      return throwError(() => error);
    }

    this.setLoading(true);
    this.clearError();

    return this.http.post<User>(this.apiUrl, user).pipe(
      map(newUser => {
        if (!newUser) {
          throw new Error('Failed to create user');
        }
        this.setLoading(false);
        this.lastUpdated = new Date();
        console.log('UserService: User created successfully', newUser);
        return newUser;
      }),
      catchError(error => {
        this.setLoading(false);
        return this.handleError(error);
      })
    );
  }

  /**
   * Update an existing user
   */
  updateUser(id: number, user: Partial<User>): Observable<User> {
    if (!id || id <= 0) {
      const error: UserError = {
        message: 'Invalid user ID',
        code: 'INVALID_ID'
      };
      return throwError(() => error);
    }

    if (!user) {
      const error: UserError = {
        message: 'User data is required',
        code: 'INVALID_INPUT'
      };
      return throwError(() => error);
    }

    this.setLoading(true);
    this.clearError();

    return this.http.put<User>(`${this.apiUrl}/${id}`, user).pipe(
      map(updatedUser => {
        if (!updatedUser) {
          throw new Error('Failed to update user');
        }
        this.setLoading(false);
        this.lastUpdated = new Date();
        console.log('UserService: User updated successfully', updatedUser);
        return updatedUser;
      }),
      catchError(error => {
        this.setLoading(false);
        return this.handleError(error);
      })
    );
  }

  /**
   * Delete a user
   */
  deleteUser(id: number): Observable<void> {
    if (!id || id <= 0) {
      const error: UserError = {
        message: 'Invalid user ID',
        code: 'INVALID_ID'
      };
      return throwError(() => error);
    }

    this.setLoading(true);
    this.clearError();

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      map(() => {
        this.setLoading(false);
        this.lastUpdated = new Date();
        console.log('UserService: User deleted successfully');
      }),
      catchError(error => {
        this.setLoading(false);
        return this.handleError(error);
      })
    );
  }

  /**
   * Build HTTP parameters from user list params
   */
  private buildHttpParams(params: UserListParams): HttpParams {
    let httpParams = new HttpParams();

    if (params.page && params.page > 0) {
      httpParams = httpParams.set('_page', params.page.toString());
    }

    if (params.limit && params.limit > 0) {
      httpParams = httpParams.set('_limit', params.limit.toString());
    }

    if (params.sort && params.sort.trim()) {
      httpParams = httpParams.set('_sort', params.sort.trim());
    }

    if (params.order && ['asc', 'desc'].includes(params.order)) {
      httpParams = httpParams.set('_order', params.order);
    }

    if (params.search && params.search.trim()) {
      httpParams = httpParams.set('q', params.search.trim());
    }

    if (params.role && params.role.trim()) {
      httpParams = httpParams.set('role', params.role.trim());
    }

    if (params.status && params.status.trim()) {
      httpParams = httpParams.set('status', params.status.trim());
    }

    return httpParams;
  }

  /**
   * Validate user data before sending to server
   */
  private validateUserData(user: Partial<User>): boolean {
    // Basic validation - in a real app, you might use a validation library
    if (user.name && typeof user.name === 'string' && user.name.trim().length === 0) {
      return false;
    }

    if (user.email && typeof user.email === 'string' && user.email.trim().length === 0) {
      return false;
    }

    if (user.role && typeof user.role === 'string' && !['admin', 'user', 'moderator'].includes(user.role)) {
      return false;
    }

    if (user.status && typeof user.status === 'string' && !['active', 'inactive', 'pending'].includes(user.status)) {
      return false;
    }

    return true;
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
        case 400:
          errorMessage = 'Invalid request data';
          errorCode = 'BAD_REQUEST';
          break;
        case 401:
          errorMessage = 'Unauthorized access';
          errorCode = 'UNAUTHORIZED';
          break;
        case 403:
          errorMessage = 'Access denied';
          errorCode = 'FORBIDDEN';
          break;
        case 404:
          errorMessage = 'User not found';
          errorCode = 'NOT_FOUND';
          break;
        case 409:
          errorMessage = 'User already exists';
          errorCode = 'CONFLICT';
          break;
        case 422:
          errorMessage = 'Validation failed';
          errorCode = 'VALIDATION_ERROR';
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

    const userError: UserError = {
      message: errorMessage,
      code: errorCode,
      details: error
    };

    this.error = userError;
    console.error('UserService: Error occurred:', userError);
    
    return throwError(() => userError);
  }

  /**
   * Set loading state
   */
  private setLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  /**
   * Clear current error
   */
  private clearError(): void {
    this.error = null;
  }

  /**
   * Get current service state
   */
  getState(): UserServiceState {
    return {
      isLoading: this.isLoading,
      error: this.error,
      lastUpdated: this.lastUpdated
    };
  }

  /**
   * Get loading state
   */
  getLoadingState(): boolean {
    return this.isLoading;
  }

  /**
   * Get current error
   */
  getError(): UserError | null {
    return this.error;
  }

  /**
   * Clear current error
   */
  clearCurrentError(): void {
    this.clearError();
  }
} 