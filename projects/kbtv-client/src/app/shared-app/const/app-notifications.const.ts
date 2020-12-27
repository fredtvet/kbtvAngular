import { AppNotification, NotificationType } from '@notification/index';

export const AppNotifications: {[key: string]: AppNotification} = {
    OnlineRequired: {title: "Denne funksjonen krever internett", type: NotificationType.Warning}
}