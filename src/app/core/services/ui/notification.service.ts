import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Notifications } from 'src/app/shared-app/enums/notifications.enum';
import { Subscription } from 'rxjs';
import { AppNotification } from 'src/app/shared-app/interfaces';
import { NotificationComponent } from 'src/app/shared-app/components';

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  private queue: AppNotification[] = [];

  private currentNotificationSub: Subscription;

  constructor(private snackBar: MatSnackBar) {}

  notify = (notification: AppNotification) => {
    if(!this.currentNotificationSub || this.currentNotificationSub.closed)
      this.setNotification(notification);
    else 
      this.queue.push(notification);
  }

  private openSnackBar(title: string, details: string[], icon:string, duration: number, panelClass:string){
    let ref = this.snackBar.openFromComponent(NotificationComponent, {
      data : { title, details, icon },
      duration: duration,
      panelClass: panelClass
    });
    this.currentNotificationSub = ref.afterDismissed().subscribe(x => this.setNextNotification())
  }

  private setNextNotification = () => {
    let notification = this.queue.shift();
    if(notification) this.setNotification(notification);
  }
   
  private setNotification = (notification: AppNotification) => {
    switch(notification.type){
      case Notifications.Success:
        this.openSnackBar(notification.title, notification.details, 'check_circle', 2000, 'notification-success');
        break;
      case Notifications.Error:
        this.openSnackBar(notification.title, notification.details, 'error', 3500, 'notification-error');
        break;
      case Notifications.Warning:
        this.openSnackBar(notification.title, notification.details, 'warning', 3500, 'notification-warn');
        break;
    }
  }



}
