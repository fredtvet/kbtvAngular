import { ErrorHandler, Injectable } from '@angular/core';
import { AppNotifications } from '@shared-app/app-notifications.const';
import { AppNotification, NotificationService } from 'notification';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private notificationService: NotificationService){}
  
    private chunkFailedExp: RegExp = /ChunkLoadError/;
    private chunkFailedNotification: AppNotification = AppNotifications.error({
       title: "Modulen kunne ikke lastes inn.",
       details: [
           "Sjekk om du har tilgang til internett",
           "Prøv å åpne applikasjonen på nytt"
       ]
    })

    handleError(error: Error): void {
        console.log(error, this.chunkFailedExp.test(error.message))
        if (this.chunkFailedExp.test(error.message)) 
            this.notificationService.notify(this.chunkFailedNotification)     
    }
}