import { Notifications } from '../enums/notifications.enum';

export interface AppNotification {
    type: Notifications;
    title?: string;
    details?: string[];
}