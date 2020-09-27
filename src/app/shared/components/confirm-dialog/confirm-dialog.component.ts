import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public config: ConfirmDialogConfig) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}

export interface ConfirmDialogConfig {
  title?: string,
  message?: string,
  discardText?: string,
  confirmText: string,
  confirmCallback?: Function,
  cancelCallback?: Function,
}
