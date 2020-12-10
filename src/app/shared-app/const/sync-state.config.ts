import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { ModelState } from '@core/state/model-state.interface';
import { SyncStatePropConfig } from '@sync/interfaces';

export type SyncModelState = Partial<ModelState> & StateCurrentUser;

export const AppSyncStateConfig: {[key in keyof SyncModelState]: SyncStatePropConfig} = 
{
    missions: {identifier: "id", type: "array"},
    missionTypes: {identifier: "id", type: "array"},
    missionImages: {identifier: "id", type: "array"},
    missionNotes: {identifier: "id", type: "array"},
    missionDocuments: {identifier: "id", type: "array"},
    employers: {identifier: "id", type: "array"},
    documentTypes: {identifier: "id", type: "array"},     
    userTimesheets: {identifier: "id", type: "array"}, 
    currentUser: {identifier: "userName", type: "value", wipeable: false}, 
};


