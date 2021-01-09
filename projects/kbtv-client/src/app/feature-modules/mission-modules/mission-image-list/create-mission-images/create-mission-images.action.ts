import { ModelFileWrapper } from '@shared/model-file.wrapper';
import { StateAction } from 'state-management'

export const CreateMissionImagesAction = "CREATE_MISSION_IMAGES_ACTION";
export interface CreateMissionImagesAction extends StateAction {
    fileWrappers: ModelFileWrapper[],
    missionId: string
}