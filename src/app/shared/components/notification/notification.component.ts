import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  host: { '(click)': 'onClick()'},
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private _snackRef: MatSnackBarRef<NotificationComponent>) { }

  ngOnInit() {}

  onClick(){
    this._snackRef.dismiss();
  }



}
