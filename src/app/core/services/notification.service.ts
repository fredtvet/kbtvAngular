import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
import { NOTIFICATIONS } from 'src/app/shared/notifications.enum';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(private _snackBar: MatSnackBar) {}

  setNotification(message: string, type: number = 0){
    switch(type){
      case NOTIFICATIONS.Success:
        this.openSnackBar(message, 'check_circle', 2000, 'notification', 'color-green');
        break;
      case NOTIFICATIONS.Error:
        this.openSnackBar(message, 'error', 3500, 'notification-error');
        break;
      case NOTIFICATIONS.Warning:
        this.openSnackBar(message, 'warning', 300500, 'notification', 'color-primary')
    }

  }

  openSnackBar(message: string, icon:string, duration: number, panelClass:string, colorClass:string = null){
    this._snackBar.openFromComponent(NotificationComponent, {
      data : { message, icon, colorClass },
      duration: duration,
      panelClass: panelClass
    })
  }

}
