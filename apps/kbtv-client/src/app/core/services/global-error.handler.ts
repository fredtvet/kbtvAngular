import { ErrorHandler, Injectable } from '@angular/core';
import { AppNotifications } from '@shared-app/constants/app-notifications.const';
import { AppNotification  } from 'notification';
import { AppNotificationService } from './app-notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private notificationService: AppNotificationService){}
  
    private chunkFailedExp: RegExp = /ChunkLoadError/;
    private chunkFailedNotification: AppNotification = AppNotifications.error({
       title: "Modulen kunne ikke lastes inn.",
       details: [
           "Sjekk om du har tilgang til internett",
           "Prøv å åpne applikasjonen på nytt"
       ]
    })

    handleError(error: Error): void {
        if (this.chunkFailedExp.test(error.message)) 
            this.notificationService.notify(this.chunkFailedNotification)     
    }
}