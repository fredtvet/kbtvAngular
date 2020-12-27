import { ModelFileWrapper } from '@model/model-file.wrapper';
import { StateAction } from '@state/state.action';

export const CreateMissionImagesAction = "CREATE_MISSION_IMAGES_ACTION";
export interface CreateMissionImagesAction extends StateAction {
    fileWrappers: ModelFileWrapper[],
    missionId: string
}