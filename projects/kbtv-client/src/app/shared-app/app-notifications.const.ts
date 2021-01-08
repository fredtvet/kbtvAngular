import { ValidationRules } from '@shared/constants/validation-rules.const';
import { NotificationType } from 'notification';
import { _formatMb } from './helpers/format-mb.helper';

export const AppNotifications = {
    onlineRequired: () => { return {title: "Denne funksjonen krever internett", type: NotificationType.Warning}},
    maxContentLength: (contentLength: number) => { 
        return {
            type: NotificationType.Error,
            title: `Forespørselen er for stor til å sendes.`,
            details: [
                `Maks størrelse ${_formatMb(ValidationRules.ContentMaxByteLength)}.`, 
                `Overskredet med  ${_formatMb(contentLength - ValidationRules.ContentMaxByteLength)}`,
            ]
        }
    }
}