import { ActionConverter } from '@model-form/interfaces';
import { ModelFileWrapper } from '@model/model-file.wrapper';
import { _idGenerator } from '@shared-app/helpers/id/id-generator.helper';
import { CreateMissionImagesAction } from './create-mission-images/create-mission-images.action';

export interface CreateMissionImagesForm { missionId: string, files: FileList }

export const _formToCreateMissionImagesConverter: ActionConverter<CreateMissionImagesForm, CreateMissionImagesAction> =
    (input: CreateMissionImagesForm): CreateMissionImagesAction => {

    const fileWrappers: ModelFileWrapper[] = [];

    for(let i = 0; i < input.files.length; i++)
        fileWrappers.push(new ModelFileWrapper(input.files[i], _idGenerator()));
    
    return new CreateMissionImagesAction(fileWrappers, input.missionId)
}