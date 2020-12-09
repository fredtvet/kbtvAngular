import { StateCurrentUser } from '@core/state/global-state.interfaces';
import { ModelState } from '@core/state/model-state.interface';
import { SyncStatePropConfig } from '@sync/interfaces';

export type SyncModelState = Partial<ModelState> & StateCurrentUser;

export interface AppSyncStatePropConfig extends SyncStatePropConfig {
    responseKey: string,
    requestKey: string,
}

export const AppSyncStateConfig: {[key in keyof SyncModelState]: AppSyncStatePropConfig} = 
{
    missions: {identifier: "id", responseKey: 'missionSync', requestKey: 'missionTimestamp'},
    missionTypes: {identifier: "id", responseKey: 'missionTypeSync', requestKey: 'missionTypeTimestamp'},
    missionImages: {identifier: "id", responseKey: 'missionImageSync', requestKey: 'missionImageTimestamp'},
    missionNotes: {identifier: "id", responseKey: 'missionNoteSync', requestKey: 'missionNoteTimestamp'},
    missionDocuments: {identifier: "id", responseKey: 'missionDocumentSync', requestKey: 'missionDocumentTimestamp'},
    employers: {identifier: "id", responseKey: 'employerSync', requestKey: 'employerTimestamp'},
    documentTypes: {identifier: "id", responseKey: 'documentTypeSync', requestKey: 'documentTypeTimestamp'},     
    userTimesheets: {identifier: "id", responseKey: 'userTimesheetSync', requestKey: 'userTimesheetTimestamp'}, 
    currentUser: {identifier: "userName", responseKey: 'currentUserSync', requestKey: 'currentUserTimestamp', singular: true, wipeable: false}, 
};


