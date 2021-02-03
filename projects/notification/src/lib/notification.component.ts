import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationSnackBarData } from './notification-snack-bar-data.interface';

@Component({
  selector: 'lib-notification',
  template: `
  <style>
    .notification-container{ overflow-wrap:break-word; word-wrap: break-word; }
    .title{ margin-left: 16px }
    .details{ max-height:30vh; overflow-y:scroll; }
  </style>
  <div class="notification-container">
    <span fxLayout="row" fxLayoutAlign="start center">
      <mat-icon>{{data.icon}}</mat-icon>
      <span class="title" *ngIf="data.title">{{ data.title }}</span>
    </span>

    <ul *ngIf="data.details" class="details mat-body">
        <li *ngFor="let detail of data.details">
            {{ detail }}
        </li>
    </ul>
  </div>
  `,
  host: { '(click)': 'onClick()'},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationSnackBarData,
    private _snackRef: MatSnackBarRef<NotificationComponent>) {}

  onClick = () => this._snackRef.dismiss();
  
}
