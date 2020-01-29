import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) {}

  setNotification(message: string){
    this.openSnackBar(message);
  }

  openSnackBar(message: string){
    this._snackBar.openFromComponent(NotificationComponent, {
      data : message,
      duration: 2000,
      panelClass: 'snackbar_margin'
    })
  }

}
