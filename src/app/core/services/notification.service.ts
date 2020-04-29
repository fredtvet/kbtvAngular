import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notifications } from 'src/app/shared/enums/notifications.enum';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(private _snackBar: MatSnackBar) {}

  lastType: Notifications;

  setNotification(message: string, type: Notifications = Notifications.Success){
    if(this.lastType === type) return undefined;
    this.lastType = type;
    setTimeout(() => {this.lastType = null}, 1000);
    switch(type){
      case Notifications.Success:
        this.openSnackBar(message, 'check_circle', 2000, 'notification', 'color-success');
        break;
      case Notifications.Error:
        this.openSnackBar(message, 'error', 3500, 'notification-error');
        break;
      case Notifications.Warning:
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
