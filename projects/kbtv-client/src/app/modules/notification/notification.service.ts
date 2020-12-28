import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Maybe } from 'global-types';
import { AppNotification } from './app-notification.interface';
import { NotificationType } from './notification-type.enum';
import { NotificationComponent } from './notification.component';

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private queue: AppNotification[] = [];

  private currentNotification: AppNotification;

  constructor(private snackBar: MatSnackBar) { }

  notify = (notification: AppNotification) => { 
    if(!this.currentNotification && this.currentNotification !== null)
       this.setNotification(notification);      
    else if(JSON.stringify(notification) !== JSON.stringify(this.currentNotification))     
        this.queue.push(notification);    
  }

  private setNotification = (input: Maybe<AppNotification>): void => {
    if(!input) return;
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

  private openSnackBar(title: Maybe<string>, details: Maybe<Maybe<string>[]>, icon:string, duration: number, panelClass:string){
    let ref = this.snackBar.openFromComponent(NotificationComponent, {
      data : { title, details, icon },
      duration: duration || undefined,
      panelClass: panelClass
    });

    ref.afterDismissed().subscribe(x => this.setNotification(this.queue.shift()))
  }

}
