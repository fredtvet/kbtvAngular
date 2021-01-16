import { StateCurrentUser } from '../state/global-state.interfaces';
import { ModelState } from '../state/model-state.interface';
import { SyncStatePropConfig } from 'state-sync';

export type SyncModelState = Partial<ModelState> & StateCurrentUser;

export const AppSyncStateConfig: {[key in keyof SyncModelState]: SyncStatePropConfig} = 
{
    missions: {idProp: "id", type: "array"},
    missionTypes: {idProp: "id", type: "array"},
    missionImages: {idProp: "id", type: "array"},
    missionNotes: {idProp: "id", type: "array"},
    missionDocuments: {idProp: "id", type: "array"},
    employers: {idProp: "id", type: "array"},
    documentTypes: {idProp: "id", type: "array"},     
    userTimesheets: {idProp: "id", type: "array"}, 
    currentUser: {idProp: "userName", type: "value", wipeable: false}, 
};


