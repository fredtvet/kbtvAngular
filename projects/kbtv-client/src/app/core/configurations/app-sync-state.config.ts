import { StateCurrentUser } from '../state/global-state.interfaces';
import { ModelState } from '../state/model-state.interface';
import { SyncStatePropConfig } from 'state-sync';
import { ModelIdProps } from './model-id-props.const';

export type SyncModelState = Partial<ModelState> & StateCurrentUser;

export const AppSyncStateConfig: {[key in keyof SyncModelState]: SyncStatePropConfig} = 
{
    missions: {idProp: ModelIdProps.missions, type: "array"},
    missionTypes: {idProp: ModelIdProps.missionTypes, type: "array"},
    missionImages: {idProp: ModelIdProps.missionImages, type: "array"},
    missionNotes: {idProp: ModelIdProps.missionNotes, type: "array"},
    missionDocuments: {idProp: ModelIdProps.missionDocuments, type: "array"},
    employers: {idProp: ModelIdProps.employers, type: "array"},
    documentTypes: {idProp: ModelIdProps.documentTypes, type: "array"},     
    userTimesheets: {idProp: ModelIdProps.userTimesheets, type: "array"}, 
    currentUser: {idProp: ModelIdProps.users, type: "value", wipeable: false}, 
};


