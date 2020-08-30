import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  template: `
    <span fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px" class="mb-1">
      <mat-icon>{{data.icon}}</mat-icon>
      <span *ngIf="data.title">{{ data.title }}</span>
    </span>

    <ul *ngFor="let detail of data.details">
        <li>
            {{ detail }}
        </li>
    </ul>
  `,
  host: { '(click)': 'onClick()'},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: {title: string, details: string[], icon: string},
    private _snackRef: MatSnackBarRef<NotificationComponent>) { }

  onClick = () => this._snackRef.dismiss();
  
}
