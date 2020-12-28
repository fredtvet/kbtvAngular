import { Maybe } from 'global-types';
import { NotificationType } from './notification-type.enum';

export interface AppNotification {
    type: NotificationType;
    title?: string;
    details?: Maybe<string>[];
    duration?: number;
}