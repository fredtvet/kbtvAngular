import { ApiUrl } from '@core/api-url.enum'
import { ModelState } from '../../interfaces'

export const MailApiUrlMap: { [key in keyof Partial<ModelState>]: string } = {
    missionImages: `${ApiUrl.MissionImage}/SendImages`,
    missionDocuments: `${ApiUrl.MissionDocument}/SendDocuments`,
}