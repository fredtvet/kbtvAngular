import { ActionConverter } from 'model-form';
import { _idGenerator } from '@shared-app/helpers/id/id-generator.helper';
import { ModelFileWrapper } from 'state-model';
import { CreateMissionImagesAction } from './create-mission-images/create-mission-images.action';

export interface CreateMissionImagesForm { missionId: string, files: FileList }

export const _formToCreateMissionImagesConverter: ActionConverter<CreateMissionImagesForm, CreateMissionImagesAction> =
    (input: CreateMissionImagesForm): CreateMissionImagesAction => {

    const fileWrappers: ModelFileWrapper[] = [];

    for(let i = 0; i < input.files.length; i++)
        fileWrappers.push(new ModelFileWrapper(input.files[i], _idGenerator()));
    
    return <CreateMissionImagesAction>{ type: CreateMissionImagesAction, fileWrappers, missionId: input.missionId }
}