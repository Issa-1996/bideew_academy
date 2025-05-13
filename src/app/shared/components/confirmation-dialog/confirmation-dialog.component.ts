import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  icon?: string;
  isDangerous?: boolean;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="confirmation-dialog">
      <div class="dialog-header" [class.danger]="data.isDangerous">
        <mat-icon *ngIf="data.icon">{{ data.icon }}</mat-icon>
        <h2 mat-dialog-title>{{ data.title || 'Confirmation' }}</h2>
      </div>
      
      <mat-dialog-content>
        <p>{{ data.message || 'Êtes-vous sûr de vouloir effectuer cette action ?' }}</p>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">
          {{ data.cancelText || 'Annuler' }}
        </button>
        <button 
          mat-flat-button 
          [color]="data.isDangerous ? 'warn' : 'primary'"
          (click)="onConfirm()"
        >
          {{ data.confirmText || 'Confirmer' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .confirmation-dialog {
      padding: 0;
      border-radius: 8px;
      max-width: 450px;
    }
    
    .dialog-header {
      display: flex;
      align-items: center;
      padding: 16px 24px;
      background-color: #2196f3;
      color: white;
      border-radius: 4px 4px 0 0;
    }
    
    .dialog-header.danger {
      background-color: #f44336;
    }
    
    .dialog-header mat-icon {
      margin-right: 12px;
      font-size: 24px;
      width: 24px;
      height: 24px;
    }
    
    .dialog-header h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
    }
    
    mat-dialog-content {
      padding: 24px;
      margin: 0;
      font-size: 16px;
      line-height: 1.5;
    }
    
    mat-dialog-actions {
      padding: 8px 16px 16px;
      margin: 0;
    }
    
    button {
      text-transform: uppercase;
      font-weight: 500;
      letter-spacing: 0.5px;
    }
  `]
})
export class ConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
