import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

export interface AppError {
  message: string;
  code: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  details?: any;
  timestamp: Date;
  userAction?: string;
}

export interface ErrorNotification {
  message: string;
  action?: string;
  duration?: number;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private errorLog: AppError[] = [];
  private readonly maxLogSize = 100;

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Handle HTTP errors
   */
  handleHttpError(error: HttpErrorResponse, context?: string): AppError {
    let appError: AppError;

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      appError = {
        message: error.error.message || 'Network error occurred',
        code: 'CLIENT_ERROR',
        severity: 'error',
        details: error,
        timestamp: new Date(),
        userAction: context
      };
    } else {
      // Server-side error
      const { message, code, severity } = this.getServerErrorMessage(error);
      appError = {
        message,
        code,
        severity,
        details: error,
        timestamp: new Date(),
        userAction: context
      };
    }

    this.logError(appError);
    this.showNotification(appError);
    
    return appError;
  }

  /**
   * Handle application errors
   */
  handleAppError(error: any, context?: string): AppError {
    const appError: AppError = {
      message: error?.message || 'An unexpected error occurred',
      code: error?.code || 'UNKNOWN_ERROR',
      severity: 'error',
      details: error,
      timestamp: new Date(),
      userAction: context
    };

    this.logError(appError);
    this.showNotification(appError);
    
    return appError;
  }

  /**
   * Handle validation errors
   */
  handleValidationError(errors: any[], context?: string): AppError {
    const appError: AppError = {
      message: 'Validation failed. Please check your input.',
      code: 'VALIDATION_ERROR',
      severity: 'warning',
      details: errors,
      timestamp: new Date(),
      userAction: context
    };

    this.logError(appError);
    this.showNotification(appError);
    
    return appError;
  }

  /**
   * Show success notification
   */
  showSuccess(message: string, action?: string, duration?: number): void {
    this.showNotification({
      message,
      action,
      duration: duration || 3000,
      severity: 'info'
    });
  }

  /**
   * Show warning notification
   */
  showWarning(message: string, action?: string, duration?: number): void {
    this.showNotification({
      message,
      action,
      duration: duration || 5000,
      severity: 'warning'
    });
  }

  /**
   * Show error notification
   */
  showError(message: string, action?: string, duration?: number): void {
    this.showNotification({
      message,
      action,
      duration: duration || 5000,
      severity: 'error'
    });
  }

  /**
   * Get server error message based on status code
   */
  private getServerErrorMessage(error: HttpErrorResponse): { message: string; code: string; severity: 'info' | 'warning' | 'error' | 'critical' } {
    switch (error.status) {
      case 400:
        return {
          message: 'Invalid request. Please check your input.',
          code: 'BAD_REQUEST',
          severity: 'warning'
        };
      case 401:
        return {
          message: 'Authentication required. Please log in.',
          code: 'UNAUTHORIZED',
          severity: 'warning'
        };
      case 403:
        return {
          message: 'Access denied. You don\'t have permission for this action.',
          code: 'FORBIDDEN',
          severity: 'error'
        };
      case 404:
        return {
          message: 'Resource not found.',
          code: 'NOT_FOUND',
          severity: 'warning'
        };
      case 409:
        return {
          message: 'Conflict detected. The resource may already exist.',
          code: 'CONFLICT',
          severity: 'warning'
        };
      case 422:
        return {
          message: 'Validation failed. Please check your input.',
          code: 'VALIDATION_ERROR',
          severity: 'warning'
        };
      case 429:
        return {
          message: 'Too many requests. Please try again later.',
          code: 'RATE_LIMIT',
          severity: 'warning'
        };
      case 500:
        return {
          message: 'Server error. Please try again later.',
          code: 'SERVER_ERROR',
          severity: 'error'
        };
      case 502:
        return {
          message: 'Bad gateway. Please try again later.',
          code: 'BAD_GATEWAY',
          severity: 'error'
        };
      case 503:
        return {
          message: 'Service unavailable. Please try again later.',
          code: 'SERVICE_UNAVAILABLE',
          severity: 'error'
        };
      case 504:
        return {
          message: 'Gateway timeout. Please try again later.',
          code: 'GATEWAY_TIMEOUT',
          severity: 'error'
        };
      default:
        return {
          message: error.message || 'Network error occurred.',
          code: 'NETWORK_ERROR',
          severity: 'error'
        };
    }
  }

  /**
   * Show notification to user
   */
  private showNotification(notification: ErrorNotification): void {
    const panelClass = this.getPanelClass(notification.severity);
    
    this.snackBar.open(
      notification.message,
      notification.action || 'Close',
      {
        duration: notification.duration || 3000,
        panelClass: [panelClass]
      }
    );
  }

  /**
   * Get CSS panel class based on severity
   */
  private getPanelClass(severity: string): string {
    switch (severity) {
      case 'info':
        return 'snackbar-info';
      case 'warning':
        return 'snackbar-warning';
      case 'error':
        return 'snackbar-error';
      case 'critical':
        return 'snackbar-critical';
      default:
        return 'snackbar-info';
    }
  }

  /**
   * Log error for debugging
   */
  private logError(error: AppError): void {
    this.errorLog.push(error);
    
    // Keep log size manageable
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog = this.errorLog.slice(-this.maxLogSize);
    }

    // Log to console for development
    console.error('ErrorHandler:', {
      message: error.message,
      code: error.code,
      severity: error.severity,
      context: error.userAction,
      timestamp: error.timestamp,
      details: error.details
    });
  }

  /**
   * Get error log
   */
  getErrorLog(): AppError[] {
    return [...this.errorLog];
  }

  /**
   * Clear error log
   */
  clearErrorLog(): void {
    this.errorLog = [];
  }

  /**
   * Get errors by severity
   */
  getErrorsBySeverity(severity: 'info' | 'warning' | 'error' | 'critical'): AppError[] {
    return this.errorLog.filter(error => error.severity === severity);
  }

  /**
   * Get errors by code
   */
  getErrorsByCode(code: string): AppError[] {
    return this.errorLog.filter(error => error.code === code);
  }

  /**
   * Get recent errors (last N errors)
   */
  getRecentErrors(count: number = 10): AppError[] {
    return this.errorLog.slice(-count);
  }
} 