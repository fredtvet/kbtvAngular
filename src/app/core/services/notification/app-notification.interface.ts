import { NotificationType } from './notification-type.enum';

export interface AppNotification {
    type: NotificationType;
    title?: string;
    details?: string[];
}