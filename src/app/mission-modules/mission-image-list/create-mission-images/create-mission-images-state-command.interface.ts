import { ModelFileWrapper } from 'src/app/core/services/model/model-file.wrapper';
import { StateCommand } from 'src/app/core/services/state/interfaces/state-command.interface';

export const CreateMissionImagesAction = "CREATE_MISSION_IMAGES";

export interface CreateMissionImagesStateCommand extends StateCommand {
    fileWrappers: ModelFileWrapper[];
    missionId: string;
}