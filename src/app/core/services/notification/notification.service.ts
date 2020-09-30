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

  private setNotification = (input: AppNotification) => {
    this.currentNotification = input;

    switch(input?.type){
      case NotificationType.Success:
        this.openSnackBar(input.title, input.details, 'check_circle', input.duration || 2000, 'notification-success');
        break;
      case NotificationType.Error:
        this.openSnackBar(input.title, input.details, 'error', input.duration || 5000, 'notification-error');
        break;
      case NotificationType.Warning:
        this.openSnackBar(input.title, input.details, 'warning', input.duration || 3500, 'notification-warn');
        break;
    }
  }

  private openSnackBar(title: string, details: string[], icon:string, duration: number, panelClass:string){
    let ref = this.snackBar.openFromComponent(NotificationComponent, {
      data : { title, details, icon },
      duration: duration || null,
      panelClass: panelClass
    });

    ref.afterDismissed().subscribe(x => this.setNotification(this.queue.shift()))
  }

}
