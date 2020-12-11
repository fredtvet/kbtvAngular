import { ModelFileWrapper } from '@model/model-file.wrapper';
import { StateAction } from '@state/state.action';

export class CreateMissionImagesAction extends StateAction {
    constructor(
        public fileWrappers: ModelFileWrapper[],
        public missionId: string
    ){ super() }
}