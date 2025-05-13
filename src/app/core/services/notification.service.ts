import { Injectable, TemplateRef } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { Observable, Subject } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface NotificationConfig {
  message: string;
  type?: NotificationType;
  duration?: number;
  action?: string;
  icon?: string;
  verticalPosition?: 'top' | 'bottom';
  horizontalPosition?: 'start' | 'center' | 'end' | 'left' | 'right';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private defaultDuration = 5000; // 5 seconds
  private loadingSubject = new Subject<boolean>();
  
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  // Show a basic notification
  show(config: NotificationConfig): void {
    const {
      message,
      type = 'info',
      duration = this.defaultDuration,
      action = 'OK',
      verticalPosition = 'top',
      horizontalPosition = 'center'
    } = config;

    const panelClass = `notification-${type}`;
    
    this.snackBar.open(message, action, {
      duration,
      panelClass: [panelClass, 'notification'],
      verticalPosition,
      horizontalPosition,
    });
  }

  // Success notification
  success(message: string, config?: Omit<NotificationConfig, 'message' | 'type'>): void {
    this.show({
      message,
      type: 'success',
      icon: 'check_circle',
      ...config
    });
  }


  // Error notification
  error(message: string, config?: Omit<NotificationConfig, 'message' | 'type'>): void {
    this.show({
      message,
      type: 'error',
      icon: 'error',
      ...config
    });
  }

  // Info notification
  info(message: string, config?: Omit<NotificationConfig, 'message' | 'type'>): void {
    this.show({
      message,
      type: 'info',
      icon: 'info',
      ...config
    });
  }


  // Warning notification
  warning(message: string, config?: Omit<NotificationConfig, 'message' | 'type'>): void {
    this.show({
      message,
      type: 'warning',
      icon: 'warning',
      ...config
    });
  }

  // Show loading indicator
  showLoading(show: boolean = true): void {
    this.loadingSubject.next(show);
  }

  // Get loading state as observable
  getLoadingState(): Observable<boolean> {
    return this.loadingSubject.asObservable();
  }

  // Show a custom dialog
  openDialog<T, D = any, R = any>(
    component: ComponentType<T> | TemplateRef<T>,
    config?: any
  ): MatDialogRef<T, R> {
    return this.dialog.open(component, {
      width: '500px',
      panelClass: 'custom-dialog',
      autoFocus: false,
      ...config
    });
  }

  // Show a confirmation dialog
  confirm(
    title: string,
    message: string,
    confirmText: string = 'Confirmer',
    cancelText: string = 'Annuler',
    isDangerous: boolean = false,
    icon?: string
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      disableClose: true,
      data: { 
        title, 
        message, 
        confirmText, 
        cancelText,
        isDangerous,
        icon
      }
    });

    return dialogRef.afterClosed();
  }


  // Show a toast with custom component
  showCustomNotification<T>(component: ComponentType<T>, config: MatSnackBarConfig = {}): MatSnackBarRef<T> {
    return this.snackBar.openFromComponent(component, {
      duration: this.defaultDuration,
      panelClass: ['custom-notification'],
      horizontalPosition: 'right',
      verticalPosition: 'top',
      ...config
    });
  }


  // Play an animation
  triggerAnimation(element: HTMLElement, animation: string): void {
    element.classList.add('animate__animated', `animate__${animation}`);
    
    // Remove the animation class after it completes
    const handleAnimationEnd = () => {
      element.classList.remove('animate__animated', `animate__${animation}`);
      element.removeEventListener('animationend', handleAnimationEnd);
    };
    
    element.addEventListener('animationend', handleAnimationEnd);
  }

  // Show a success animation
  showSuccessAnimation(element: HTMLElement): void {
    this.triggerAnimation(element, 'tada');
  }

  // Show an error animation
  showErrorAnimation(element: HTMLElement): void {
    this.triggerAnimation(element, 'shakeX');
  }

  // Show a loading animation
  showLoadingAnimation(element: HTMLElement): void {
    this.triggerAnimation(element, 'pulse');
  }
}
