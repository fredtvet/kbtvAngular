import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppNotification } from 'src/app/core/services/notification/app-notification.interface';
import { NotificationComponent } from 'src/app/shared-app/components/notification.component';
import { NotificationType } from './notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private queue: AppNotification[] = [];

  private currentNotification: AppNotification;

  constructor(private snackBar: MatSnackBar) {}

  notify = (notification: AppNotification) => {
    if(!this.currentNotification && this.currentNotification !== null)
       this.setNotification(notification);      
    else if(JSON.stringify(notification) !== JSON.stringify(this.currentNotification))     
        this.queue.push(notification);    
  }

  private openSnackBar(title: string, details: string[], icon:string, duration: number, panelClass:string){
    let ref = this.snackBar.openFromComponent(NotificationComponent, {
      data : { title, details, icon },
      duration: duration,
      panelClass: panelClass
    });

    ref.afterDismissed().subscribe(x => this.setNotification(this.queue.shift()))
  }
   
  private setNotification = (notification: AppNotification) => {
    this.currentNotification = notification;

    switch(notification?.type){
      case NotificationType.Success:
        this.openSnackBar(notification.title, notification.details, 'check_circle', 2000, 'notification-success');
        break;
      case NotificationType.Error:
        this.openSnackBar(notification.title, notification.details, 'error', 3500, 'notification-error');
        break;
      case NotificationType.Warning:
        this.openSnackBar(notification.title, notification.details, 'warning', 3500, 'notification-warn');
        break;
    }
  }



}
