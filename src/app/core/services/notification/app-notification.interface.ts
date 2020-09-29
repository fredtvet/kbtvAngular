import { NotificationDuration } from './notification-duration.enum';
import { NotificationType } from './notification-type.enum';

export interface AppNotification {
    type: NotificationType;
    title?: string;
    details?: string[];
    duration?: NotificationDuration;
}