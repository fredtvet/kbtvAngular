import { ValidationRules } from '@shared/constants/validation-rules.const';
import { NotificationType } from 'notification';

export const AppNotifications = {
    onlineRequired: () => { return {title: "Denne funksjonen krever internett", type: NotificationType.Warning}},
    maxContentLength: (contentLength: number) => { 
        return {
            type: NotificationType.Error,
            title: `Forespørselen er for stor til å sendes.`,
            details: [
                `Maks størrelse ${formatMb(ValidationRules.ContentMaxByteLength)}.`, 
                `Overskredet med  ${formatMb(contentLength - ValidationRules.ContentMaxByteLength)}`,
            ]
        }
    }
}

const formatMb = (bytes: number): string => (Math.round((bytes / 1000000)*10) / 10) + " mb"