import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationSnackBarData } from './notification-snack-bar-data.interface';

@Component({
  selector: 'lib-notification',
  templateUrl: './notification.component.html',
  host: { '(click)': 'onClick()'},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationSnackBarData,
    private _snackRef: MatSnackBarRef<NotificationComponent>) {}

  onClick = () => this._snackRef.dismiss();
  
}
