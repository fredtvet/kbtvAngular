import { Maybe } from '@global/interfaces';
import { NotificationType } from './notification-type.enum';

export interface AppNotification {
    type: NotificationType;
    title?: string;
    details?: Maybe<string>[];
    duration?: number;
}