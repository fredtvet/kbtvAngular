import { ModelFileWrapper } from 'src/app/model/model-file.wrapper';
import { _idGenerator } from 'src/app/shared-app/helpers/id/id-generator.helper';
import { CreateMissionImagesActionId, CreateMissionImagesStateCommand } from './create-mission-images/create-mission-images-state-command.interface';

export interface CreateMissionImagesForm { missionId: string, files: FileList }

export class FormToCreateMissionImagesStateCommandAdapter implements CreateMissionImagesStateCommand{

    actionId: string = CreateMissionImagesActionId;
    missionId: string;
    fileWrappers: ModelFileWrapper[] = [];

    constructor(input: CreateMissionImagesForm){
        this.missionId = input.missionId;
        for(let i = 0; i < input.files.length; i++){
            this.fileWrappers.push(new ModelFileWrapper(input.files[i], _idGenerator()));
        }
    }
}