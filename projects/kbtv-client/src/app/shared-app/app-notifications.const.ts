import { ValidationRules } from '@shared/constants/validation-rules.const';
import { AppNotification, NotificationType } from 'notification';
import { _formatMb } from './helpers/format-mb.helper';

export const AppNotifications = {
    error: (input: {title?: string, details?: string[], duration?: number}): AppNotification => { 
        return { ...input, type: NotificationType.Error, panelClass: 'notification-error'}
    },
    success: (input: {title?: string, details?: string[], duration?: number}): AppNotification => { 
        return {...input, type: NotificationType.Success, panelClass: 'notification-success'}
    },
    warning: (input: {title?: string, details?: string[], duration?: number}): AppNotification => { 
        return {...input, type: NotificationType.Warning, panelClass: 'notification-warning'}
    },
    onlineRequired: () => { return AppNotifications.warning({title: "Denne funksjonen krever internett"}) },
    maxContentLength: (contentLength: number): AppNotification => { 
        return AppNotifications.error({
            title: `Forespørselen er for stor til å sendes.`,
            details: [
                `Maks størrelse ${_formatMb(ValidationRules.ContentMaxByteLength)}.`, 
                `Overskredet med  ${_formatMb(contentLength - ValidationRules.ContentMaxByteLength)}`,
            ]
        })
    },
}