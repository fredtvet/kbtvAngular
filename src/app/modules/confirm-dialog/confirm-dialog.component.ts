import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogConfig } from './confirm-dialog-config.interface';

@Component({
  selector: 'app-confirm-dialog',
  template: `
  <mat-card>

    <mat-card-header *ngIf="config.title">
      <mat-card-title>
        {{ config.title }}
      </mat-card-title>
    </mat-card-header>

    <mat-card-content *ngIf="config.message">
      <p>{{ config.message || 'Vennligst bekreft operasjonen.' }}</p>
    </mat-card-content>

    <mat-card-actions fxLayout="row" fxLayoutAlign="end center">
      <button mat-button (click)="onNoClick()">{{ config.discardText || 'Avbryt'}}</button>
      <button mat-button  [mat-dialog-close]="true" cdkFocusInitial>{{ config.confirmText }}</button>
    </mat-card-actions>

  </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public config: ConfirmDialogConfig) {}

  onNoClick = (): void => this.dialogRef.close(false);
  
}


