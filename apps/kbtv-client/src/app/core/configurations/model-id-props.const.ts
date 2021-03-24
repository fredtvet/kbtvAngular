import { ModelState } from "@core/state/model-state.interface";

export const ModelIdProps: {[key in keyof ModelState]: string} = {
    missions: 'id',
    employers: 'id',
    missionDocuments: 'id',
    missionImages: 'id',
    missionNotes: 'id',
    missionTypes: 'id',
    timesheets: 'id',
    userTimesheets: 'id',
    inboundEmailPasswords: 'id',
    users: 'userName',    
}