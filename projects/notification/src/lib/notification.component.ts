import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationSnackBarData } from './notification-snack-bar-data.interface';

@Component({
  selector: 'lib-notification',
  template: `
  <div style="overflow-wrap:break-word;word-wrap: break-word;">
    <span fxLayout="row" fxLayoutAlign="start center" fxLayoutGap="8px" style="margin-bottom:4px;">
      <mat-icon>{{data.icon}}</mat-icon>
      <span style="overflow:hidden" *ngIf="data.title">{{ data.title }}</span>
    </span>

    <ul style="max-height:30vh;overflow-y:scroll">
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
