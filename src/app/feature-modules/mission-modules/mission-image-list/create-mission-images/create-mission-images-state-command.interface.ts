import { ModelFileWrapper } from '@model/model-file.wrapper';
import { StateAction } from '@state/interfaces';

export const CreateMissionImagesActionId = "CREATE_MISSION_IMAGES";

export interface CreateMissionImagesStateCommand extends StateAction {
    fileWrappers: ModelFileWrapper[];
    missionId: string;
}