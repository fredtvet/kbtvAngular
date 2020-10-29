import { AppNotification, NotificationType } from 'src/app/notification';

export const AppNotifications: {[key: string]: AppNotification} = {
    OnlineRequired: {title: "Denne funksjonen krever internett", type: NotificationType.Warning}
}