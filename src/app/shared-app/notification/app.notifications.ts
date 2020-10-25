import { AppNotification } from './app-notification.interface';
import { NotificationType } from './notification-type.enum';

export const AppNotifications: {[key: string]: AppNotification} = {
    OnlineRequired: {title: "Denne funksjonen krever internett", type: NotificationType.Warning}
}