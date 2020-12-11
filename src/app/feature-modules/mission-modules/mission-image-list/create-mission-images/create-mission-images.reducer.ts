import { _addOrUpdateRange } from '@array/add-or-update-range.helper';
import { MissionImage } from '@core/models';
import { StateMissionImages } from '@core/state/global-state.interfaces';
import { Reducer } from '@state/interfaces';
import { CreateMissionImagesAction } from './create-mission-images.action';

export const CreateMissionImagesReducer: Reducer<StateMissionImages, CreateMissionImagesAction> = {
    action: CreateMissionImagesAction,
    stateProperties: ["missionImages"],
    reducerFn: _reducerFn,
}

function _reducerFn(state: StateMissionImages, action: CreateMissionImagesAction): StateMissionImages{  
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