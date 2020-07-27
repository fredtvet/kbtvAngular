import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  host: { '(click)': 'onClick()'},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: {title: string, details: string[], icon: string},
    private _snackRef: MatSnackBarRef<NotificationComponent>) {  }

  onClick = () => this._snackRef.dismiss();
  
}
