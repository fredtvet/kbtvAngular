import { Prop } from 'src/app/shared-app/prop.type';
import { StoreState, SyncStatePropConfig } from '../../core/services/sync/interfaces';

export const SyncStateConfig = 
    <{[key in Prop<Omit<StoreState, "timestamps" | "syncConfig">>]: SyncStatePropConfig}>
{
    missions: {responseKey: 'missionSync', requestKey: 'missionTimestamp'},
    missionTypes: {responseKey: 'missionTypeSync', requestKey: 'missionTypeTimestamp'},
    missionImages: {responseKey: 'missionImageSync', requestKey: 'missionImageTimestamp'},
    missionNotes: {responseKey: 'missionNoteSync', requestKey: 'missionNoteTimestamp'},
    missionDocuments: {responseKey: 'missionDocumentSync', requestKey: 'missionDocumentTimestamp'},
    employers: {responseKey: 'employerSync', requestKey: 'employerTimestamp'},
    documentTypes: {responseKey: 'documentTypeSync', requestKey: 'documentTypeTimestamp'},     
    userTimesheets: {responseKey: 'userTimesheetSync', requestKey: 'userTimesheetTimestamp'}, 
    currentUser: {responseKey: 'currentUserSync', requestKey: 'currentUserTimestamp', singular: true, wipeable: false}, 
};
