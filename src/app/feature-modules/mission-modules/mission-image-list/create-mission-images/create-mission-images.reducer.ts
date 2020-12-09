import { MissionImage } from '@core/models';
import { _addOrUpdateRange } from '@array/add-or-update-range.helper';
import { Reducer } from '@state/interfaces';
import { CreateMissionImagesActionId, CreateMissionImagesStateCommand } from './create-mission-images-state-command.interface';
import { StateMissionImages } from '@core/state/global-state.interfaces';

export const CreateMissionImagesReducer: Reducer<StateMissionImages> = {
    actionId: CreateMissionImagesActionId,
    stateProperties: ["missionImages"],
    reducerFn: _reducerFn,
}

function _reducerFn(state: StateMissionImages, action: CreateMissionImagesStateCommand): StateMissionImages{  
    if(!action.fileWrappers || !action.missionId) 
        console.error('no files or missionId provided');

    const entities: MissionImage[] = [];
    for(let i = 0; i < action.fileWrappers.length; i++){
        const wrapper = action.fileWrappers[i];
        const file = wrapper.modifiedFile;
        entities.push({
            id: wrapper.id, 
            missionId: action.missionId, 
            fileName: wrapper.modifiedFile.name,
            temp_localFileUrl: URL.createObjectURL(file)
        })
    }
    state.missionImages = _addOrUpdateRange(state.missionImages, entities, "id");
    return state;
}